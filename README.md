# App de Capacitaciones - Versión Estática

Esta es una aplicación web estática para gestión de capacitaciones y evaluaciones, desarrollada con Next.js y TailwindCSS. Al ser una versión estática, es fácil de desplegar en plataformas como Netlify sin necesidad de configurar un backend.

## Características

- Diseño responsivo con TailwindCSS
- Interfaz de usuario moderna e intuitiva
- Simulación de autenticación (sin backend real)
- Páginas para gestión de capacitaciones
- Sistema de evaluaciones con cuestionarios predefinidos
- Resultados y calificaciones

## Tecnologías Utilizadas

- **Next.js**: Framework de React para renderizado estático
- **TypeScript**: Para tipado estático
- **TailwindCSS**: Para estilos
- **React Hooks**: Para gestión de estado

## Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd app-capacitaciones
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación en modo desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Netlify

La aplicación está configurada para desplegarse fácilmente en Netlify:

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio de GitHub
3. Configura los siguientes ajustes:
   - Build command: `npm run build`
   - Publish directory: `.next`

Netlify detectará automáticamente que es una aplicación Next.js y utilizará el plugin correspondiente.

## Estructura del Proyecto

```
app-capacitaciones/
├── public/            # Archivos estáticos
├── src/               # Código fuente
│   ├── app/           # Páginas y componentes
│   │   ├── auth/      # Páginas de autenticación
│   │   ├── dashboard/ # Dashboard del usuario
│   │   ├── evaluations/ # Sistema de evaluaciones
│   │   ├── globals.css # Estilos globales
│   │   ├── layout.tsx # Layout principal
│   │   └── page.tsx   # Página de inicio
├── .gitignore
├── netlify.toml       # Configuración para Netlify
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Notas Importantes

Esta es una versión estática que simula la funcionalidad de una aplicación completa. No hay persistencia de datos ni autenticación real. Los datos son simulados para demostración.

## Licencia

MIT 