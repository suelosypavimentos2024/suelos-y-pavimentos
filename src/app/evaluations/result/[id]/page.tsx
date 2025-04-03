'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface EvaluationResult {
  id: string;
  title: string;
  date: string;
  score: number;
  feedback: string;
}

export default function EvaluationResultPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') ? parseInt(searchParams.get('score')!) : 0;
  
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí cargaríamos los resultados de la evaluación desde Firebase
    // Por ahora, simulamos la carga de datos
    setTimeout(() => {
      const mockResult: EvaluationResult = {
        id: params.id,
        title: params.id === '1' ? 'Evaluación de Seguridad' : 'Evaluación de Procedimientos',
        date: new Date().toLocaleDateString(),
        score: score,
        feedback: getFeedback(score)
      };
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [params.id, score]);

  const getFeedback = (score: number): string => {
    if (score >= 90) {
      return 'Excelente rendimiento. Dominas los conocimientos evaluados.';
    } else if (score >= 70) {
      return 'Buen rendimiento. Tienes una comprensión sólida de los temas.';
    } else if (score >= 50) {
      return 'Rendimiento satisfactorio. Hay áreas que puedes mejorar.';
    } else {
      return 'Necesitas reforzar tus conocimientos en este tema. Te recomendamos revisar los materiales de capacitación.';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Los resultados no se encontraron</p>
          <Link href="/dashboard" className="btn-primary mt-4 inline-block">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold mb-6">{result.title}</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <p className="text-gray-600">Completado: {result.date}</p>
            <div className={`${getScoreColor(result.score)} px-4 py-2 rounded-full font-medium text-lg`}>
              Puntaje: {result.score}%
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Evaluación de Desempeño</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className={`h-4 rounded-full ${
                  result.score >= 90 ? 'bg-green-500' :
                  result.score >= 70 ? 'bg-blue-500' :
                  result.score >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
            
            <div className="p-4 bg-gray-50 border rounded mb-6">
              <h4 className="font-medium mb-2">Feedback:</h4>
              <p>{result.feedback}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-secondary text-center">
              Ver todas las evaluaciones
            </Link>
            {result.score < 70 && (
              <Link href={`/evaluations/${result.id}`} className="btn-primary text-center">
                Volver a intentar
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 