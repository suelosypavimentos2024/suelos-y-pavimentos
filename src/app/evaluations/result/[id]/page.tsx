import Link from 'next/link';

// Datos de resultados predefinidos
const evaluationTitles = {
  '1': 'Evaluación de Seguridad',
  '2': 'Evaluación de Procedimientos',
  '3': 'Evaluación de Inducción'
};

// Puntajes simulados para demo
const demoScores = {
  '1': 85,
  '2': 72,
  '3': 95
};

// Esta función es necesaria para generar páginas estáticas con parámetros dinámicos
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

function getFeedback(score: number): string {
  if (score >= 90) {
    return 'Excelente rendimiento. Dominas los conocimientos evaluados.';
  } else if (score >= 70) {
    return 'Buen rendimiento. Tienes una comprensión sólida de los temas.';
  } else if (score >= 50) {
    return 'Rendimiento satisfactorio. Hay áreas que puedes mejorar.';
  } else {
    return 'Necesitas reforzar tus conocimientos en este tema. Te recomendamos revisar los materiales de capacitación.';
  }
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-blue-100 text-blue-800';
  if (score >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export default function EvaluationResultPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const title = evaluationTitles[id as keyof typeof evaluationTitles] || 'Evaluación';
  const score = demoScores[id as keyof typeof demoScores] || 75;
  const feedback = getFeedback(score);
  const date = '01/04/2025'; // Fecha fija para demo estática
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Resultado de Evaluación</h1>
            <Link href="/dashboard" className="text-white hover:underline">
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <p className="text-gray-600">Completado: {date}</p>
            <div className={`${getScoreColor(score)} px-4 py-2 rounded-full font-medium text-lg`}>
              Puntaje: {score}%
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Evaluación de Desempeño</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className={`h-4 rounded-full ${
                  score >= 90 ? 'bg-green-500' :
                  score >= 70 ? 'bg-blue-500' :
                  score >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            
            <div className="p-4 bg-gray-50 border rounded mb-6">
              <h4 className="font-medium mb-2">Feedback:</h4>
              <p>{feedback}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-secondary text-center">
              Ver todas las evaluaciones
            </Link>
            {score < 70 && (
              <Link href={`/evaluations/${id}`} className="btn-primary text-center">
                Volver a intentar
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 