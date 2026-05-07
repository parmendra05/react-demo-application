# Sprint 2 — Spring Boot Backend & API Layer

**Goal:** Create the Spring Boot backend with H2 database and the React API client that connects to it.

---

## What You Will Do
- Create the Spring Boot project with all required files
- Set up H2 database with `schema.sql` and `data.sql`
- Create `projectApi.js` in React to call the backend

---

## Part A — Spring Boot Backend (`project-dashboard-api/`)

### Step 1 — Create the Project Structure

Create this folder structure manually:

```
project-dashboard-api/
├── pom.xml
└── src/main/
    ├── java/com/dashboard/api/
    │   └── ProjectDashboardApiApplication.java
    └── resources/
        ├── application.properties
        ├── schema.sql
        └── data.sql
```

---

### Step 2 — Create `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/>
    </parent>
    <groupId>com.dashboard</groupId>
    <artifactId>project-dashboard-api</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.datatype</groupId>
            <artifactId>jackson-datatype-jsr310</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

### Step 3 — Create `application.properties`

```properties
server.port=8080

spring.datasource.url=jdbc:h2:mem:dashboarddb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true

spring.sql.init.mode=always

spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.date-format=yyyy-MM-dd
```

**Key settings explained:**
| Property | Purpose |
|----------|---------|
| `spring.jpa.hibernate.ddl-auto=none` | Hibernate does NOT create tables — `schema.sql` does it instead |
| `spring.sql.init.mode=always` | Runs `schema.sql` and `data.sql` on every startup |
| `write-dates-as-timestamps=false` | Sends `LocalDate` as `"2026-06-15"` string, not `[2026,6,15]` array |

---

### Step 4 — Create `schema.sql`

This file runs on every startup — it drops and recreates the table so data is always clean:

```sql
DROP TABLE IF EXISTS project;

CREATE TABLE project (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    manager     VARCHAR(255) NOT NULL,
    status      VARCHAR(50)  NOT NULL,
    deadline    DATE         NOT NULL,
    description TEXT
);
```

> `deadline` is a `DATE` column — not `VARCHAR`. H2 maps this directly to `LocalDate` in Java.

---

### Step 5 — Create `data.sql`

This file inserts the 4 default projects on every startup:

```sql
INSERT INTO project (name, manager, status, deadline, description) VALUES
    ('HR Platform Migration',            'Ranjat Srivastava', 'In Progress', '2026-06-15', 'Migrating the legacy HR platform to a new cloud-native architecture.'),
    ('Q2 Marketing Campaign Analytics',  'Priya Sharma',      'Completed',   '2026-04-30', 'Analyze the performance of all digital marketing campaigns from the second quarter.'),
    ('Customer Support AI Chatbot',      'Sushant Mishra',    'On Hold',     '2026-09-01', 'Develop a new AI-powered chatbot to handle initial customer support queries.'),
    ('Internal DevOps Toolchain Upgrade','Ankit Verma',       'In Progress', '2026-07-20', 'Upgrade CI/CD pipelines and containerize all internal services using Docker and Kubernetes.');
```

> Because `schema.sql` runs first (DROP + CREATE), then `data.sql` runs (INSERT), the 4 default projects are always present after every restart.

---

### Step 6 — Create the Main Application Class

```java
package com.dashboard.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectDashboardApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjectDashboardApiApplication.class, args);
    }
}
```

---

### Step 7 — Start the Backend

```bash
cd project-dashboard-api
mvn spring-boot:run
```

Wait for: `Started ProjectDashboardApiApplication in X.XXX seconds`

Verify it works — open `http://localhost:8080/h2-console`:
- JDBC URL: `jdbc:h2:mem:dashboarddb`
- Username: `sa` / Password: *(empty)*
- Run: `SELECT * FROM PROJECT;` → should show 4 rows ✅

---

## Part B — React API Client (`demo-application/`)

### Step 8 — Create `src/api/projectApi.js`

This file contains all HTTP calls to the Spring Boot backend in one place:

```js
const BASE = "/api/projects";

async function handleResponse(res) {
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(BASE);
  return handleResponse(res);
}

export async function createProject(projectData) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
}

export async function updateProject(id, projectData) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return handleResponse(res);
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
```

**Understanding the code:**

`handleResponse` — centralised error handling for all API calls:
```js
if (!res.ok) throw new Error(...)   // any 4xx or 5xx throws an error
if (res.status === 204) return null // DELETE returns no body
return res.json()                   // parse JSON for everything else
```

`BASE = "/api/projects"` — uses a relative URL. Vite proxy (configured in Sprint 9) forwards `/api` to `http://localhost:8080`.

---

### Step 9 — Configure Vite Proxy

Update `vite.config.js` to add the proxy:

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

**Why a proxy?**
Without it, the browser would call `http://localhost:5173/api/projects` which doesn't exist.
The proxy intercepts any request starting with `/api` and forwards it to `http://localhost:8080/api/projects`.

---

## Key Concept — Why No mockData.js?

In the previous version of this app, data was stored in a `mockData.js` file.
That file has been removed. Data now comes from the real Spring Boot backend.

```
Before:  React → mockData.js (fake, in-memory, lost on refresh)
After:   React → Spring Boot → H2 Database (real, persists across page refreshes)
```

---

## Definition of Done
- [ ] `pom.xml` created with all dependencies
- [ ] `application.properties` created
- [ ] `schema.sql` created with `DATE` column for deadline
- [ ] `data.sql` created with 4 default projects
- [ ] `mvn spring-boot:run` starts without errors
- [ ] H2 console shows 4 rows at `http://localhost:8080/h2-console`
- [ ] `src/api/projectApi.js` created in React project
- [ ] `vite.config.js` updated with proxy config
