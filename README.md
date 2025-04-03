# App de Capacitaciones

Una plataforma completa para gestionar capacitaciones, evaluaciones y seguimiento de progreso. Esta aplicación permite asignar evaluaciones personalizadas a cada usuario, definir fechas de vencimiento, enviar notificaciones automáticas y generar reportes de desempeño.

## Características Principales

- **Gestión de Usuarios**: Registro e inicio de sesión de usuarios con correo y contraseña. Opción de recuperación de contraseña.
- **Asignación de Evaluaciones**: Asignar evaluaciones personalizadas a cada usuario con fechas de vencimiento.
- **Calificación y Seguimiento**: Sistema de calificación de evaluaciones y generación de reportes de desempeño.
- **Notificaciones**: Alertas automáticas para recordar los plazos de entrega.

## Tecnologías Utilizadas

- **Frontend**: Next.js (React), Tailwind CSS
- **Autenticación**: Firebase Authentication
- **Base de Datos**: Firestore Database
- **Almacenamiento**: Firebase Storage
- **Despliegue**: Vercel

## Requisitos Previos

- Node.js 18.0.0 o superior
- Cuenta de Firebase (gratuita)
- Cuenta de Vercel (gratuita)

## Instalación Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/app-capacitaciones.git
   cd app-capacitaciones
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Authentication, Firestore y Storage
   - Copia las credenciales de tu aplicación web Firebase
   - Actualiza el archivo `src/services/firebase/config.ts` con tus credenciales:
     ```typescript
     const firebaseConfig = {
       apiKey: "TU_API_KEY",
       authDomain: "tu-proyecto.firebaseapp.com",
       projectId: "tu-proyecto",
       storageBucket: "tu-proyecto.appspot.com",
       messagingSenderId: "TU_MESSAGING_SENDER_ID",
       appId: "TU_APP_ID"
     };
     ```

4. **Ejecutar la aplicación en modo desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Producción

### Despliegue en Vercel (Recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com) si no tienes una
2. Instala la CLI de Vercel:
   ```bash
   npm install -g vercel
   ```
3. Desde la carpeta del proyecto, ejecuta:
   ```bash
   vercel
   ```
4. Sigue las instrucciones para vincular tu proyecto a Vercel
5. Una vez desplegado, Vercel te proporcionará una URL para acceder a tu aplicación

### Configuración de Variables de Entorno

Para mantener seguras tus credenciales de Firebase, configura las variables de entorno en Vercel:

1. Ve a la configuración de tu proyecto en Vercel
2. En la sección "Environment Variables", agrega tus credenciales de Firebase con los siguientes nombres:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## Personalización

### Roles de Usuario
Por defecto, la aplicación incluye roles básicos (administrador y estudiante). Para agregar roles adicionales:

1. Modifica la estructura de Firestore para incluir un campo de rol en la colección de usuarios
2. Actualiza los componentes de autenticación para manejar estos roles
3. Implementa lógica de control de acceso en las páginas correspondientes

### Evaluaciones Personalizadas
Para crear tipos de evaluaciones adicionales:

1. Define nuevas estructuras de datos en Firestore
2. Crea nuevos componentes para renderizar diferentes tipos de preguntas
3. Implementa lógicas de evaluación específicas para cada tipo

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Haz push a tu rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Soporte

Si tienes preguntas o problemas, abre un issue en el repositorio o contacta al equipo de desarrollo.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles. 