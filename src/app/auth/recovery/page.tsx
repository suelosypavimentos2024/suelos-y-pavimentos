'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validaciones básicas
    if (!email) {
      setError('El correo electrónico es requerido');
      setLoading(false);
      return;
    }

    try {
      // Simulación de envío de correo de recuperación exitoso
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Error al enviar el correo de recuperación');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md p-8 card">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Se ha enviado un correo de recuperación a <strong>{email}</strong>.
              Por favor, revise su bandeja de entrada.
            </div>
            <Link href="/auth/login" className="btn-primary inline-block">
              Volver a Iniciar Sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-1 font-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <p className="text-sm mt-2 text-gray-600">
                Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
              </p>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full mb-4"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
            </button>
            
            <p className="text-center">
              <Link href="/auth/login" className="text-primary hover:underline">
                Volver a Iniciar Sesión
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 