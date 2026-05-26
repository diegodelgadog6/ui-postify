# UI Postify

React 19 + Vite + Tailwind CSS v4. No TypeScript. No test suite.

## Commands

```bash
npm run dev      # dev server with HMR
npm run build    # production build
npm run lint     # eslint .
npm run preview  # preview production build
```

## Tech stack notes

- Tailwind CSS v4 uses `@tailwindcss/vite` plugin (not the classic setup with postcss)
- React Compiler is **not enabled** (impacts dev/build perf per template docs)
- React Router v7 (`react-router` + `react-router-dom`)
- No TypeScript configured; stick to JSX