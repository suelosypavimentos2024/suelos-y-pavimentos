'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Importaríamos componentes específicos aquí

// Definir las interfaces para nuestros tipos de datos
interface PendingEvaluation {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
}

interface CompletedEvaluation {
  id: string;
  title: string;
  date: string;
  score: number;
}

// Definir los datos fijos para la versión estática
const userData = {
  name: 'Juan Pérez'
};

const pendingEvaluations = [
  { id: '1', title: 'Evaluación de Seguridad', dueDate: '2025-04-15', progress: 0 },
  { id: '2', title: 'Evaluación de Procedimientos', dueDate: '2025-04-20', progress: 0 }
];

const completedEvaluations = [
  { id: '3', title: 'Evaluación de Inducción', date: '2025-03-01', score: 95 }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">App de Capacitaciones</h1>
          <div className="flex items-center gap-4">
            <span>Bienvenido, {userData.name}</span>
            <Link href="/" className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100">
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Evaluaciones Pendientes</h3>
            {pendingEvaluations.length === 0 ? (
              <p className="text-gray-500">No tienes evaluaciones pendientes.</p>
            ) : (
              <div className="space-y-4">
                {pendingEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border rounded p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{evaluation.title}</h4>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Pendiente
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Fecha límite: {evaluation.dueDate}</p>
                    <Link 
                      href={`/evaluations/${evaluation.id}`}
                      className="mt-3 btn-primary text-sm inline-block"
                    >
                      Iniciar Evaluación
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Evaluaciones Completadas</h3>
            {completedEvaluations.length === 0 ? (
              <p className="text-gray-500">No has completado ninguna evaluación.</p>
            ) : (
              <div className="space-y-4">
                {completedEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border rounded p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{evaluation.title}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Completado
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Finalizado: {evaluation.date}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Puntaje:</span> {evaluation.score}%
                    </p>
                    <Link 
                      href={`/evaluations/result/${evaluation.id}`}
                      className="mt-3 text-primary text-sm hover:underline inline-block"
                    >
                      Ver Resultados
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 