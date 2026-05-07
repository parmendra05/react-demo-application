# 🗂️ Project Dashboard — Complete Demo Presentation Guide

---

## 👋 Opening Statement

> "Hi, I'd like to walk you through a **full-stack Project Dashboard** application I built from scratch.
> It is a complete end-to-end system — a **React 19 frontend** connected to a **Java Spring Boot backend**
> with an **H2 in-memory database**, following proper **layered architecture**.
> The goal is to give teams a clean, fast way to track and manage all internal projects in one place."

---

## 🧱 Complete Tech Stack

### Frontend — `demo-application/`
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18 | Component-based UI with hooks |
| **Vite** | 5 | Fast dev server, proxy configuration |
| **react-datepicker** | 9 | Calendar popup for deadline field |
| **Vitest** | 2 | Unit test runner |
| **@testing-library/react** | 16 | Component testing utilities |
| **Custom CSS** | — | Clean styling, zero external UI libraries |

### Backend — `project-dashboard-api/`
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Backend language |
| **Spring Boot** | 3.2.5 | REST API framework |
| **Spring Data JPA** | — | Repository pattern, ORM |
| **H2 Database** | — | In-memory database, auto-seeded on startup |
| **Lombok** | — | `@Data`, `@RequiredArgsConstructor` reduce boilerplate |
| **Jackson JSR310** | — | Serializes `LocalDate` as `"yyyy-MM-dd"` string |

---

## ✅ PRE-DEMO CHECKLIST — Do This Before Presenting

Run these checks before opening the screen share:

**1. Verify Java 17 is installed:**
```bash
java -version
```
Expected output: `openjdk version "17.x.x"`

**2. Verify Maven is installed:**
```bash
mvn -version
```
Expected output: `Apache Maven 3.x.x`

**3. Verify Node.js is installed:**
```bash
node -v
npm -v
```
Expected: Node 18 or higher

**4. Install React dependencies:**
```bash
cd "c:\Users\parme\Desktop\New folder\demo-application"
npm install
```

**5. Verify ports are free:**
- Port `8080` must be free — Spring Boot uses it
- Port `5173` must be free — Vite uses it

**6. Verify both project folders exist:**
```
c:\Users\parme\Desktop\New folder\project-dashboard-api\   ← Spring Boot
c:\Users\parme\Desktop\New folder\demo-application\        ← React
```

---

## 🚀 STEP 1 — Start the Spring Boot Backend

Open **Terminal 1** and run:
```bash
cd "c:\Users\parme\Desktop\New folder\project-dashboard-api"
mvn spring-boot:run
```

**Watch the console — wait for this line:**
```
Started ProjectDashboardApiApplication in X.XXX seconds
```

**What happens on startup automatically:**
1. `schema.sql` runs → drops and recreates the `project` table with correct columns
2. `data.sql` runs → inserts the 4 default projects into H2
3. REST API is ready at `http://localhost:8080`
4. H2 Console is available at `http://localhost:8080/h2-console`

> "The backend is now running. Notice I didn't set up any external database —
> H2 is an in-memory database that starts automatically with the application.
> The `schema.sql` and `data.sql` files ensure the default data is always there on every startup."

---

## 🚀 STEP 2 — Start the React Frontend

Open **Terminal 2** and run:
```bash
cd "c:\Users\parme\Desktop\New folder\demo-application"
npm run dev
```

**Watch for:**
```
  VITE v5.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

> "The frontend is running on port 5173. Vite is configured with a **proxy** —
> any request to `/api` is automatically forwarded to `http://localhost:8080`.
> This means React never directly calls port 8080, which avoids CORS issues."

**Show `vite.config.js` proxy config:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🌐 STEP 3 — Open the Application

Open browser → go to **http://localhost:5173**

**What to point out immediately:**
- The page shows **"Loading projects…"** briefly
- This is a **real HTTP GET request** to `http://localhost:8080/api/projects`
- Not a fake delay — actual network call to the Spring Boot backend
- After the response arrives, 4 project cards appear

> "The loading state gives users feedback while the API call is in flight.
> In `App.jsx`, `useEffect` fires once on mount, calls `fetchProjects()`,
> which hits `GET /api/projects`, and when the response arrives, state updates and cards render."

---

## 📊 STEP 4 — Stats Row

Point to the 4 summary cards at the top:

| Card | Count | Source |
|------|-------|--------|
| **Total** | 4 | `projects.length` |
| **In Progress** | 2 | HR Migration + DevOps Upgrade |
| **Completed** | 1 | Q2 Marketing Analytics |
| **On Hold** | 1 | AI Chatbot |

> "These numbers come from the `StatsRow` component.
> It receives the **full** projects array — not the filtered one —
> so the counts always reflect the total database state, not just what's visible on screen.
> They update live whenever a project is added, edited, or deleted."

---

## 🔍 STEP 5 — Search Feature

- Type **"Priya"** → only Q2 Marketing Campaign Analytics appears
- Clear → type **"HR"** → only HR Platform Migration appears
- Clear → type **"zzz"** → shows **"No projects match your search."**
- Clear → all 4 cards return

> "Search filters across both **project name and manager name** simultaneously.
> It runs on every keystroke — no button, no extra API call.
> The `ProjectGrid` component handles the empty state — it never shows a blank screen."

---

## 🏷️ STEP 6 — Filter Tabs

Click through each tab:

| Tab | Projects shown |
|-----|---------------|
| **All** | All 4 (default) |
| **In Progress** | HR Platform Migration, DevOps Toolchain Upgrade |
| **Completed** | Q2 Marketing Campaign Analytics |
| **On Hold** | Customer Support AI Chatbot |

**Show combined search + filter:**
- Click **"In Progress"** tab → type **"Ankit"** → only DevOps card shows

> "Search and filter work together — both conditions apply at the same time.
> The active tab is highlighted in purple using a simple dynamic CSS class:
> `filter === s ? 'filter-tab active' : 'filter-tab'`"

---

## 🃏 STEP 7 — Project Cards

Point out each element on a card:

- 🏷️ **Status badge** — color-coded: blue = In Progress, green = Completed, yellow = On Hold
- 📅 **Deadline** — real `DATE` type from H2, stored as `LocalDate` in Java
- 👤 **Manager name**
- 📝 **Description**
- 🖱️ **Hover effect** — subtle shadow, handled purely in CSS

> "Each card is the `ProjectCard` component — it receives one project object as a prop.
> The `StatusBadge` component builds the CSS class dynamically:
> `'badge badge-' + status.toLowerCase().replace(' ', '-')`
> So 'In Progress' becomes 'badge-in-progress' which maps to the blue CSS rule."

---

## 🔍 STEP 8 — View Project Details (Read)

Click on **"HR Platform Migration"** card:

- Modal popup opens showing: name, status badge, description, manager, deadline
- **Two ways to close:**
  - Click the **✕ button** (top right)
  - Click the **dark overlay** outside the modal

> "The `ProjectModal` uses `ModalOverlay` — a reusable wrapper component.
> `stopPropagation` on the inner box prevents clicks inside from bubbling up to the overlay.
> The modal is controlled by one state variable — `selected` in App.jsx.
> `null` means closed. A project object means open."

---

## ➕ STEP 9 — Add New Project (Create)

Click **"+ Add Project"** button (top right of the header):

**Fill in the form:**
- **Project Name:** `Mobile App Redesign`
- **Manager:** open the dropdown — all 4 existing managers are listed automatically
- Select **"➕ Add New Manager"** → text input appears → type `Neha Kapoor` → notice the ✕ to cancel back to dropdown
- **Status:** `In Progress`
- **Deadline:** click the field → calendar opens → pick any future date → notice past dates are disabled → month/year dropdowns for quick navigation
- **Description:** `Redesign the mobile app UI for better user experience`

Click **"Add Project"**

**What happens behind the scenes:**
```
React (ProjectForm)
  → onSave(formData) called
  → App.jsx handleAdd()
  → POST /api/projects  { name, manager, status, deadline, description }
  ← 201 Created + { id: 5, name: "Mobile App Redesign", ... }
  → setProjects([...prev, newProject])
  → new card appears in grid
  → Stats "Total" → 5, "In Progress" → 3
```

> "The form is the `ProjectForm` component — it is used for both Add and Edit.
> When `initial` prop is null it is add mode. The manager dropdown is built dynamically
> from `[...new Set(projects.map(p => p.manager))]` — unique names from existing data."

---

## ✏️ STEP 10 — Edit a Project (Update)

Click on **"HR Platform Migration"** card → modal opens → click **"✏️ Edit"**:

- Form opens **pre-filled** with all existing data
- Change **Status** from `In Progress` to `Completed`
- Change the **Deadline** using the calendar
- Click **"Save Changes"**

**What happens behind the scenes:**
```
React (ProjectForm)
  → onSave(formData) called
  → App.jsx handleEdit()
  → PUT /api/projects/1  { id: 1, name: "HR Platform Migration", status: "Completed", ... }
  ← 200 OK + updated project JSON
  → setProjects(prev.map(p => p.id === updated.id ? updated : p))
  → card updates immediately — badge changes from blue to green
  → Stats "In Progress" → 1, "Completed" → 2
```

> "The same `ProjectForm` component handles edit mode — when `initial` prop has a project object,
> the form pre-fills using `useState(() => initial ?? emptyForm)` lazy initializer."

---

## 🗑️ STEP 11 — Delete a Project (Delete)

Click on **"Customer Support AI Chatbot"** card → modal opens → click **"🗑️ Delete"**:

- Modal closes immediately
- Card disappears from the grid
- Stats "On Hold" count drops to 0, "Total" drops by 1

**What happens behind the scenes:**
```
React (ProjectModal)
  → onDelete(project.id) called
  → App.jsx handleDelete(id)
  → DELETE /api/projects/3
  ← 204 No Content
  → setProjects(prev.filter(p => p.id !== id))
  → setSelected(null) — closes the modal
```

> "The backend returns `204 No Content` — the standard HTTP response for a successful delete.
> The `handleResponse` helper in `projectApi.js` handles this:
> `if (res.status === 204) return null` — no body to parse."

---

## 🔄 STEP 12 — Prove Data Persists After Refresh

> "Before the Spring Boot integration, all data lived only in React state —
> refreshing the page would lose everything. Let me prove that is fixed."

1. Note the current project count (e.g. 4 after the delete)
2. Press **F5** to refresh the browser
3. The same projects are still there ✅

> "Data now survives a page refresh because it is stored in the H2 database,
> not in React's in-memory state."

---

## 🔄 STEP 13 — Prove Default Data Resets on Backend Restart

> "H2 is an in-memory database — it resets when the JVM stops.
> But `schema.sql` and `data.sql` run on every startup, so the 4 default projects always come back."

1. Add a new project — **"Temp Project"**
2. Stop Spring Boot (Ctrl+C in Terminal 1)
3. Run `mvn spring-boot:run` again
4. Refresh the browser
5. **"Temp Project" is gone** — back to the original 4 ✅

> "This is intentional for a demo/dev environment.
> In production you would switch to a persistent database like PostgreSQL or MySQL."

---

## 🗄️ STEP 14 — Show the H2 Database Console

Open **http://localhost:8080/h2-console**

Fill in:
- **JDBC URL:** `jdbc:h2:mem:dashboarddb`
- **Username:** `sa`
- **Password:** *(leave empty)*

Click **Connect** → run:
```sql
SELECT * FROM PROJECT;
```

Point out:
- `ID` column — auto-generated by H2 (`BIGINT AUTO_INCREMENT`)
- `DEADLINE` column — stored as `DATE` type, not a string
- All 4 default rows from `data.sql`

> "This is the actual live database. The `deadline` column is a proper `DATE` type —
> not a `VARCHAR`. In the Java entity, it maps to `LocalDate` from `java.time`.
> Jackson serializes it as `'yyyy-MM-dd'` string for the React frontend."

---

## 🏗️ STEP 15 — Architecture Walkthrough

### Frontend Component Tree
```
App.jsx  (state: projects, loading, search, filter, selected, formProject)
 ├── StatsRow           ← 4 summary count cards
 ├── FilterBar          ← search input + filter tab buttons
 ├── ProjectGrid        ← loading / empty / cards grid
 │    └── ProjectCard   ← single project card (uses StatusBadge)
 ├── ProjectModal       ← detail popup (uses StatusBadge + ModalOverlay)
 └── ProjectForm        ← add/edit form (uses ModalOverlay + ManagerSelect + DeadlinePicker)
```

### Frontend File Structure
```
demo-application/src/
├── api/
│   └── projectApi.js        ← GET, POST, PUT, DELETE — all HTTP calls here
├── components/
│   ├── StatusBadge.jsx      ← reusable colored status label
│   ├── ModalOverlay.jsx     ← reusable dark overlay wrapper
│   ├── FilterBar.jsx        ← search + filter tabs
│   ├── ProjectCard.jsx      ← single project card
│   ├── StatsRow.jsx         ← 4 stat cards
│   ├── ProjectGrid.jsx      ← loading / empty / grid states
│   ├── ProjectModal.jsx     ← detail popup with Edit + Delete
│   ├── ManagerSelect.jsx    ← dropdown + new manager input
│   ├── DeadlinePicker.jsx   ← calendar date picker
│   └── ProjectForm.jsx      ← add / edit form modal
├── App.jsx                  ← all state + CRUD handlers
└── App.css                  ← all styles
```

### Backend Layered Architecture
```
project-dashboard-api/src/main/java/com/dashboard/api/
├── controller/
│   └── ProjectController.java   ← HTTP only — @GetMapping, @PostMapping etc.
├── service/
│   └── ProjectService.java      ← business logic — toDTO(), toEntity(), findById()
├── repository/
│   └── ProjectRepository.java   ← extends JpaRepository<Project, Long>
├── entity/
│   └── Project.java             ← @Entity, @Table("project"), LocalDate deadline
├── dto/
│   └── ProjectDTO.java          ← API contract — what React sends and receives
├── exception/
│   └── ProjectNotFoundException ← @ResponseStatus(404) — auto returns 404
└── ProjectDashboardApiApplication.java
```

> "Each layer has one responsibility:
> Controller handles HTTP. Service handles logic. Repository handles data.
> The entity never leaves the service layer — the controller only works with DTOs.
> This means if the database schema changes, the API contract stays the same."

---

## 🔗 STEP 16 — Full Request Flow (End to End)

Walk through a complete Add Project request:

```
1. User fills form → clicks "Add Project"
         ↓
2. ProjectForm → onSave(formData)
         ↓
3. App.jsx → handleAdd(formData)
         ↓
4. projectApi.js → POST /api/projects  (JSON body)
         ↓
5. Vite Proxy → forwards to http://localhost:8080/api/projects
         ↓
6. ProjectController → @PostMapping → projectService.create(dto)
         ↓
7. ProjectService → toEntity(dto) → projectRepository.save(entity)
         ↓
8. ProjectRepository → INSERT INTO project (...) VALUES (...)
         ↓
9. H2 Database → stores row, returns generated id
         ↓
10. ProjectService → toDTO(savedEntity) → returns ProjectDTO
         ↓
11. ProjectController → ResponseEntity.status(201).body(dto)
         ↓
12. React → receives { id: 5, name: "...", ... }
         ↓
13. App.jsx → setProjects([...prev, newProject])
         ↓
14. React re-renders → new card appears in grid
```

---

## 📋 STEP 17 — REST API Endpoints Reference

| Method | Endpoint | Action | HTTP Response |
|--------|----------|--------|---------------|
| `GET` | `/api/projects` | Fetch all projects | `200 OK` + JSON array |
| `GET` | `/api/projects/{id}` | Fetch one project | `200 OK` + JSON object |
| `POST` | `/api/projects` | Create new project | `201 Created` + JSON object |
| `PUT` | `/api/projects/{id}` | Update project | `200 OK` + JSON object |
| `DELETE` | `/api/projects/{id}` | Delete project | `204 No Content` |

**Error case — project not found:**
- `GET /api/projects/999` → `404 Not Found`
- Handled by `ProjectNotFoundException` with `@ResponseStatus(HttpStatus.NOT_FOUND)`

---

## 💡 STEP 18 — Key Design Decisions to Highlight

| Decision | Why it matters |
|----------|---------------|
| `LocalDate` for deadline (not `String`) | Type-safe, DB enforces valid dates, enables date arithmetic |
| `DATE` column in H2 (not `VARCHAR`) | Database-level constraint — invalid dates cannot be stored |
| DTO pattern (`ProjectDTO`) | Entity never exposed — API contract decoupled from DB model |
| `ProjectNotFoundException` + `@ResponseStatus` | Returns proper `404` automatically — no manual error handling in controller |
| `schema.sql` + `data.sql` | H2 resets on restart — these files always restore default data |
| Vite proxy (`/api` → port 8080) | Single origin for browser — no CORS issues in development |
| `@CrossOrigin` on controller | Backup CORS config if proxy is bypassed |
| `@RequiredArgsConstructor` (Lombok) | Constructor injection without writing boilerplate constructor code |
| 10 small React components | Single responsibility — each component does exactly one thing |
| `handleResponse` helper in `projectApi.js` | Centralised error handling — all API calls go through one place |

---

## ⚠️ STEP 19 — What Happens If Backend Is Not Running

If Spring Boot is stopped and you try to add/edit/delete in React:

- An `alert()` appears: **"Failed to add project. Is the backend running?"**
- The error is also logged to browser console (F12 → Console)
- This is handled in `App.jsx` in every `try/catch` block

> "The frontend handles backend failures gracefully — users get a clear message
> instead of a silent failure or a broken UI."

---

## 🎯 Closing Statement

> "To summarize what I've built:
>
> On the **frontend** — a React 19 application with 10 focused components,
> real API integration, full CRUD operations, live search and filtering,
> a calendar date picker, and a dynamic manager dropdown.
>
> On the **backend** — a Spring Boot 3.2 REST API following strict layered architecture
> with separate Controller, Service, Repository, Entity, DTO, and Exception layers,
> backed by an H2 in-memory database that auto-seeds 4 default projects on every startup
> using `schema.sql` and `data.sql`.
>
> The two applications are fully integrated via a Vite proxy.
> Data entered in the UI is persisted in the database and survives page refreshes.
> The deadline field uses `LocalDate` in Java and `DATE` in H2 — not a string.
>
> I'm happy to dive deeper into any part of the code."

---

## ⚡ FINAL DEMO CHECKLIST

Tick each item off during the demo:

**Setup**
- [ ] Java 17 confirmed (`java -version`)
- [ ] Maven confirmed (`mvn -version`)
- [ ] Node 18+ confirmed (`node -v`)
- [ ] Port 8080 free
- [ ] Port 5173 free
- [ ] `npm install` done in `demo-application/`

**Starting Up**
- [ ] Spring Boot started → "Started ProjectDashboardApiApplication" in console
- [ ] React started → Vite ready at `http://localhost:5173`
- [ ] Browser opened at `http://localhost:5173`

**UI Demo**
- [ ] Loading state visible briefly on page load
- [ ] 4 project cards appear
- [ ] Stats row shows correct counts (4 Total, 2 In Progress, 1 Completed, 1 On Hold)
- [ ] Search "Priya" → 1 card
- [ ] Search "zzz" → empty state message
- [ ] Clear search → all cards back
- [ ] Filter tabs — click each one
- [ ] Combined: "In Progress" tab + type "Ankit" → 1 card
- [ ] Click a card → detail modal opens
- [ ] Close modal via ✕ button
- [ ] Close modal via overlay click
- [ ] Click inside modal → does NOT close

**CRUD**
- [ ] Add project → fill all fields → show manager dropdown → show calendar → submit
- [ ] New card appears → stats update
- [ ] Edit project → form pre-filled → change status → save → badge color changes
- [ ] Delete project → card removed → stats update

**Persistence**
- [ ] Refresh browser (F5) → data still there
- [ ] Restart Spring Boot → data resets to default 4

**H2 Console**
- [ ] Open `http://localhost:8080/h2-console`
- [ ] Connect with `jdbc:h2:mem:dashboarddb` / `sa` / no password
- [ ] Run `SELECT * FROM PROJECT`
- [ ] Show `DEADLINE` column as `DATE` type

**Architecture**
- [ ] Show frontend folder structure
- [ ] Show backend layered package structure
- [ ] Explain Controller → Service → Repository → Entity flow
- [ ] Show `vite.config.js` proxy
- [ ] Show `schema.sql` and `data.sql`

---

*Full-Stack Project Dashboard | React 18 + Spring Boot 3.2.5 + H2 | Java 17 | Presented by: [Your Name]*
