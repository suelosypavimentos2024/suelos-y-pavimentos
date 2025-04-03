import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">App de Capacitaciones</h1>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Bienvenido a la Plataforma de Capacitaciones</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Una solución completa para gestionar capacitaciones, evaluaciones y seguimiento de progreso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/login" className="btn-primary">
                Iniciar Sesión
              </Link>
              <Link href="/auth/register" className="btn-secondary">
                Registrarse
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Características Principales</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Gestión de Usuarios</h3>
                <p>Registro e inicio de sesión de usuarios con correo y contraseña. Opción de recuperación de contraseña.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Asignación de Evaluaciones</h3>
                <p>Asigna evaluaciones personalizadas a cada usuario con fechas de vencimiento y notificaciones automáticas.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Calificación y Seguimiento</h3>
                <p>Sistema de calificación de evaluaciones y generación de reportes de desempeño por usuario.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} App de Capacitaciones. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 