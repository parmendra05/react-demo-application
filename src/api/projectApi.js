// projectApi.js — all HTTP calls to the Spring Boot backend
// Base URL uses Vite proxy — /api is forwarded to http://localhost:8080

const BASE = "/api/projects";

// Helper — throws a readable error if the response is not OK
async function handleResponse(res) {
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  if (res.status === 204) return null; // DELETE returns no body
  return res.json();
}

// GET /api/projects — fetch all projects
export async function fetchProjects() {
  const res = await fetch(BASE);
  return handleResponse(res);
}

// POST /api/projects — create a new project
export async function createProject(projectData) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
}

// PUT /api/projects/:id — update an existing project
export async function updateProject(id, projectData) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
}

// DELETE /api/projects/:id — delete a project
export async function deleteProject(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
