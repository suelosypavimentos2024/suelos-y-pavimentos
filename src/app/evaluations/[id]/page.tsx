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
  const evaluation = evaluationsData[params.id as keyof typeof evaluationsData];

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

  // Para exportación estática, mostramos el contenido de la evaluación sin interactividad
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
                {evaluation.questions.length} preguntas
              </span>
            </div>
            <p className="text-gray-600">{evaluation.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Contenido de la evaluación:</h3>
            <div className="space-y-6">
              {evaluation.questions.map((question, index) => (
                <div key={question.id} className="border p-4 rounded bg-gray-50">
                  <h4 className="font-medium mb-3">Pregunta {index + 1}: {question.question}</h4>
                  <ul className="space-y-2 ml-5 list-disc">
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4 italic">Para realizar esta evaluación, inicia sesión en la aplicación</p>
            <Link href="/auth/login" className="btn-primary">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 