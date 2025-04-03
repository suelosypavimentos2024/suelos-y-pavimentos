'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Datos de evaluaciones predefinidos
const evaluationsData = {
  '1': {
    id: '1',
    title: 'Evaluación de Seguridad',
    description: 'Completa todas las preguntas para finalizar la evaluación.',
    dueDate: '2025-04-20',
    questions: [
      {
        id: 'q1',
        question: '¿Cuál es el procedimiento correcto al encontrar un riesgo de seguridad?',
        options: [
          'Ignorarlo si no es grave',
          'Reportarlo inmediatamente al supervisor',
          'Solucionarlo por cuenta propia',
          'Notificar al compañero más cercano'
        ],
        correctOption: 1
      },
      {
        id: 'q2',
        question: '¿Qué equipo de protección es obligatorio en todas las áreas?',
        options: [
          'Casco de seguridad',
          'Guantes de protección',
          'Protección ocular',
          'Todos los anteriores'
        ],
        correctOption: 3
      },
      {
        id: 'q3',
        question: '¿Cuál es la frecuencia recomendada para las capacitaciones de seguridad?',
        options: [
          'Una vez al año',
          'Cada seis meses',
          'Cada tres meses',
          'Mensualmente'
        ],
        correctOption: 2
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Evaluación de Procedimientos',
    description: 'Completa todas las preguntas para finalizar la evaluación.',
    dueDate: '2025-04-20',
    questions: [
      {
        id: 'q1',
        question: '¿Cuál es el primer paso al iniciar el procedimiento estándar?',
        options: [
          'Verificar el equipo',
          'Contactar al supervisor',
          'Revisar el manual',
          'Usar equipo de protección'
        ],
        correctOption: 3
      },
      {
        id: 'q2',
        question: '¿Qué documento debe completarse al finalizar un procedimiento?',
        options: [
          'Reporte de incidentes',
          'Formulario de finalización',
          'Bitácora de actividades',
          'Ninguno de los anteriores'
        ],
        correctOption: 2
      }
    ]
  }
};

// Esta función es necesaria para generar páginas estáticas con parámetros dinámicos
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

export default function EvaluationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const evaluation = evaluationsData[params.id as keyof typeof evaluationsData];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (evaluation && currentQuestion < evaluation.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    if (!evaluation) return 0;
    
    let correctAnswers = 0;
    evaluation.questions.forEach(question => {
      if (answers[question.id] === question.correctOption) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / evaluation.questions.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      const score = calculateScore();
      router.push(`/evaluations/result/${params.id}?score=${score}`);
    }, 800);
  };

  // Verificar si todas las preguntas están respondidas
  const allQuestionsAnswered = evaluation?.questions.every(q => answers[q.id] !== undefined);

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">La evaluación no se encontró</p>
          <Link href="/dashboard" className="btn-primary mt-4 inline-block">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = evaluation.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{evaluation.title}</h1>
            <Link href="/dashboard" className="text-white hover:underline">
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="card max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{evaluation.title}</h2>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Pregunta {currentQuestion + 1} de {evaluation.questions.length}
              </span>
            </div>
            <p className="text-gray-600">{evaluation.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(Object.keys(answers).length / evaluation.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">{currentQ.question}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div 
                  key={index}
                  className={`border p-4 rounded cursor-pointer hover:bg-gray-50 ${
                    answers[currentQ.id] === index ? 'border-primary bg-blue-50' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                >
                  <label className="flex items-start cursor-pointer">
                    <input 
                      type="radio"
                      name={`question-${currentQ.id}`}
                      checked={answers[currentQ.id] === index}
                      onChange={() => handleAnswerSelect(currentQ.id, index)}
                      className="mt-1"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded ${
                currentQuestion === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Anterior
            </button>
            
            {currentQuestion < evaluation.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="btn-primary"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || submitting}
                className={`btn-primary ${
                  !allQuestionsAnswered || submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Enviando...' : 'Finalizar Evaluación'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 