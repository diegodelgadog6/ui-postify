# Postify

Red social de publicaciones con imágenes, al estilo Instagram. Este repositorio contiene la interfaz en React. La API está en [Server-Postify](https://github.com/diegodelgadog6/Server-Postify).

**Demo:** https://postify.diegodelgadogontes.com/profile/e4f72569-8304-4167-882c-c06d6b34da91

## Funcionalidades

- **Perfil** (`/profile/:userId`): cuadrícula con las publicaciones del usuario, con su número de likes y comentarios.
- **Subir publicaciones**: el perfil incluye un formulario para publicar una o varias imágenes, que la API guarda en Cloudinary.
- **Detalle de publicación** (`/posts/:postId`): imágenes, descripción, likes y comentarios.

## Tecnologías

React 19 · Vite · Tailwind CSS 4 · React Router 7 · React Icons · Vercel

## Estructura

```text
src/
  main.jsx           Rutas de la aplicación
  config/api.js      URL base de la API
  hooks/useFetch.jsx Hook para peticiones GET
  views/
    Profile.jsx      Perfil y formulario de publicación
    Post.jsx         Detalle de una publicación
    Home.jsx         Inicio (en construcción)
```

## Desarrollo local

Requiere Node.js 20 o superior y la [API](https://github.com/diegodelgadog6/Server-Postify) corriendo.

```bash
npm install
cp .env.example .env
npm run dev
```

La app queda en http://localhost:5173. La URL de la API se configura en `.env`:

```bash
VITE_API_URL=http://localhost:8000
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Ejecuta ESLint |

## Autor

**Diego Alejandro Delgado Gontes** · [GitHub](https://github.com/diegodelgadog6) · [Portafolio](https://diegodelgadogontes.com)
