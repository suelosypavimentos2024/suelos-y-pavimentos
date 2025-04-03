import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential,
  User
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Registro de usuario
export const registerUser = async (
  email: string, 
  password: string, 
  name: string
): Promise<UserCredential> => {
  try {
    // Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar el perfil del usuario con su nombre
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        name,
        role: 'student', // Rol por defecto
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Inicio de sesión
export const loginUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Cierre de sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Recuperación de contraseña
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
    throw error;
  }
};

// Obtener el usuario actual
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Verificar si el usuario está autenticado
export const isUserAuthenticated = (): boolean => {
  return !!auth.currentUser;
}; 