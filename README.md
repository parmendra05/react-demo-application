# React + Vite — Project Dashboard

This project is a full-stack **Project Dashboard** application built with React 18 and Vite 5, connected to a Java Spring Boot backend with an H2 in-memory database.

## Tech Stack

### Frontend
- **React 18** — component-based UI with hooks
- **Vite 5** — fast dev server with proxy configuration
- **react-datepicker** — calendar popup for deadline field
- **Custom CSS** — clean styling, no external UI libraries

### Testing
- **Vitest 2** — unit test runner
- **@testing-library/react** — component testing utilities
- **@testing-library/jest-dom** — DOM matchers

### Backend (separate project)
- **Java 17 + Spring Boot 3.2.5** — REST API
- **Spring Data JPA + H2** — in-memory database

## Getting Started

### Start the backend
```bash
cd project-dashboard-api
mvn spring-boot:run
```

### Start the frontend
```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Available Scripts

```bash
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build
npm run preview      # preview production build
npm run test         # run unit tests (watch mode)
npm run test:coverage  # run tests with coverage report
```

## Project Structure

```
src/
├── api/
│   └── projectApi.js        ← all HTTP calls (GET, POST, PUT, DELETE)
├── components/
│   ├── StatusBadge.jsx
│   ├── ModalOverlay.jsx
│   ├── FilterBar.jsx
│   ├── ProjectCard.jsx
│   ├── StatsRow.jsx
│   ├── ProjectGrid.jsx
│   ├── ProjectModal.jsx
│   ├── ManagerSelect.jsx
│   ├── DeadlinePicker.jsx
│   └── ProjectForm.jsx
├── __tests__/               ← unit tests for all components
├── App.jsx                  ← main component, all state + CRUD handlers
├── App.css                  ← all styles
└── main.jsx
```

## Vite Proxy

All `/api` requests are forwarded to `http://localhost:8080` (Spring Boot backend):

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```
