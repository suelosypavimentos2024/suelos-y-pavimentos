import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  serverTimestamp, 
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

// Interfaces
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
}

export interface Evaluation {
  id?: string;
  title: string;
  description: string;
  dueDate: Date | Timestamp;
  questions: Question[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface EvaluationResult {
  id?: string;
  evaluationId: string;
  userId: string;
  score: number;
  answers: Record<string, number>;
  submittedAt: Date | Timestamp;
  feedback?: string;
}

// Obtener todas las evaluaciones
export const getAllEvaluations = async (): Promise<Evaluation[]> => {
  try {
    const evaluationsRef = collection(db, 'evaluations');
    const q = query(evaluationsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Evaluation[];
  } catch (error) {
    console.error('Error al obtener evaluaciones:', error);
    throw error;
  }
};

// Obtener evaluaciones pendientes de un usuario
export const getPendingEvaluations = async (userId: string): Promise<Evaluation[]> => {
  try {
    const evaluationsRef = collection(db, 'evaluations');
    const resultsRef = collection(db, 'evaluationResults');
    
    // Obtener todas las evaluaciones
    const evaluationsSnapshot = await getDocs(evaluationsRef);
    const allEvaluations = evaluationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Evaluation[];
    
    // Obtener resultados del usuario
    const q = query(resultsRef, where('userId', '==', userId));
    const resultsSnapshot = await getDocs(q);
    const completedEvaluationIds = resultsSnapshot.docs.map(doc => doc.data().evaluationId);
    
    // Filtrar evaluaciones pendientes
    return allEvaluations.filter(eval => !completedEvaluationIds.includes(eval.id));
  } catch (error) {
    console.error('Error al obtener evaluaciones pendientes:', error);
    throw error;
  }
};

// Obtener evaluaciones completadas de un usuario
export const getCompletedEvaluations = async (userId: string): Promise<{ evaluation: Evaluation, result: EvaluationResult }[]> => {
  try {
    const resultsRef = collection(db, 'evaluationResults');
    const q = query(resultsRef, where('userId', '==', userId), orderBy('submittedAt', 'desc'));
    const resultsSnapshot = await getDocs(q);
    
    const results = resultsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EvaluationResult[];
    
    // Obtener detalles de las evaluaciones
    const completedEvaluations = await Promise.all(
      results.map(async (result) => {
        const evaluationDoc = await getDoc(doc(db, 'evaluations', result.evaluationId));
        return {
          evaluation: { id: evaluationDoc.id, ...evaluationDoc.data() } as Evaluation,
          result
        };
      })
    );
    
    return completedEvaluations;
  } catch (error) {
    console.error('Error al obtener evaluaciones completadas:', error);
    throw error;
  }
};

// Obtener una evaluación por ID
export const getEvaluationById = async (id: string): Promise<Evaluation | null> => {
  try {
    const evaluationDoc = await getDoc(doc(db, 'evaluations', id));
    
    if (evaluationDoc.exists()) {
      return { id: evaluationDoc.id, ...evaluationDoc.data() } as Evaluation;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener evaluación:', error);
    throw error;
  }
};

// Guardar resultado de evaluación
export const saveEvaluationResult = async (result: Omit<EvaluationResult, 'id'>): Promise<string> => {
  try {
    const resultWithTimestamp = {
      ...result,
      submittedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'evaluationResults'), resultWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar resultado:', error);
    throw error;
  }
};

// Crear nueva evaluación
export const createEvaluation = async (evaluation: Omit<Evaluation, 'id'>): Promise<string> => {
  try {
    const evaluationWithTimestamp = {
      ...evaluation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'evaluations'), evaluationWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear evaluación:', error);
    throw error;
  }
}; 