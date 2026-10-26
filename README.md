# 💼 Mini JobTrack — Job Application Management Dashboard

[![Java](https://img.shields.io/badge/Java-21-orange.svg?style=flat&logo=openjdk)](https://www.oracle.com/java/technologies/downloads/#java21)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?style=flat&logo=vite)](https://vite.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Mini JobTrack** is a full-stack web application designed to help job seekers discover job listings, track personalized application pipelines, schedule interviews, and visualize career funnel analytics.

Built with a **Spring Boot 3 (Java 21)** backend, a **React 19 (Vite)** frontend with dark glassmorphic styling, and **PostgreSQL**, Mini JobTrack replaces fragmented spreadsheets with an interactive, organized, and real-time dashboard.

---

## 📑 Table of Contents

- [Overview & Key Features](#-overview--key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Prerequisites](#-prerequisites)
- [Database Setup (PostgreSQL)](#-database-setup-postgresql)
- [Environment Variables](#-environment-variables)
- [Getting Started & Running Locally](#-getting-started--running-locally)
  - [1. Backend Setup (Spring Boot)](#1-backend-setup-spring-boot)
  - [2. Frontend Setup (React + Vite)](#2-frontend-setup-react--vite)
- [Available Scripts & Commands](#-available-scripts--commands)
- [API Architecture & Endpoints](#-api-architecture--endpoints)
- [UI & Aesthetics](#-ui--aesthetics)
- [Roadmap & Development Phases](#-roadmap--development-phases)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Contributing & License](#-contributing--license)

---

## 🚀 Overview & Key Features

- **📊 Centralized Application Tracking**: Keep track of applications across different statuses: `Wishlist`, `Applied`, `Interviewing`, `Offer Received`, and `Rejected`.
- **📈 Interactive Funnel Analytics**: Dynamic chart visualizations powered by [Recharts](https://recharts.org/) tracking application velocity, response rates, and interview conversion ratios.
- **🧭 Job Discovery & Explorer**: Explore new opportunities with structured company, role, salary range, and location filters.
- **🕒 Interview Scheduler**: Monitor active interview stages, upcoming interview rounds, and notes.
- **🎨 Modern Dark Glassmorphism UI**: High-contrast, responsive interface built with Bootstrap 5.3, custom CSS tokens, and [Lucide React](https://lucide.dev/) icons.
- **🛡️ Secure & Environment-Driven**: Clean separation between dev, test, and production environments; zero secrets committed to source control.

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│             Frontend: React 19 + Vite (5173)           │
│   (Bootstrap 5.3 + Glassmorphism + Recharts + Lucide)  │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON (Axios API Client)
                           ▼
┌────────────────────────────────────────────────────────┐
│         Backend: Spring Boot 3.3.5 REST API (8080)     │
│   - Controllers (REST endpoints)                       │
│   - Services (Business logic & validations)            │
│   - Repositories (Spring Data JPA / Hibernate)         │
└──────────────────────────┬─────────────────────────────┘
                           │ JDBC (PostgreSQL Driver)
                           ▼
┌────────────────────────────────────────────────────────┐
│             Database: PostgreSQL 16+ (5432)            │
│                 Schema: jobtrack_db                    │
└────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Java** | 21 LTS | Core programming language |
| **Spring Boot** | 3.3.5 | Application framework & REST API engine |
| **Spring Data JPA** | 3.3.5 | Object-Relational Mapping (Hibernate 6) |
| **PostgreSQL Driver** | Latest | Production database driver (`org.postgresql:postgresql`) |
| **H2 Database** | Runtime | In-memory database for isolated automated test suite |
| **Spring Validation**| 3.3.5 | Bean validation (`@Valid`, constraints) |
| **Maven** | 3.9+ | Dependency management and build tool (`mvnw` wrapper included) |

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19.3.1 | Core UI library |
| **Vite** | 8.3.4 | Ultra-fast build tool and development server |
| **Bootstrap** | 5.3.8 | Grid layout, responsive utilities, base styles |
| **Axios** | 1.20.0 | Promise-based HTTP client with request/response interceptors |
| **Recharts** | 3.10.1 | Composable charting library for funnel analytics |
| **Lucide React** | 1.61.0 | Vector icon set |

---

## 📁 Project Directory Structure

```text
MiniJobTrack/
├── backend/
│   ├── .mvn/wrapper/                 # Maven wrapper binaries & configurations
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jobtrack/
│   │   │   │   ├── JobTrackApplication.java  # Spring Boot Main Entry Point
│   │   │   │   ├── config/          # Bean, CORS, and security configuration
│   │   │   │   ├── controller/      # REST API Controllers (@RestController)
│   │   │   │   ├── service/         # Business logic layer (@Service)
│   │   │   │   ├── repository/      # Spring Data JPA interfaces (@Repository)
│   │   │   │   ├── entity/          # JPA database models (@Entity)
│   │   │   │   ├── dto/             # Request & Response Data Transfer Objects
│   │   │   │   └── exception/       # Global exception handlers (@ControllerAdvice)
│   │   │   └── resources/
│   │   │       └── application.properties # Spring configuration & DB placeholders
│   │   └── test/
│   │       ├── java/com/jobtrack/
│   │       │   └── JobTrackApplicationTests.java
│   │       └── resources/
│   │           └── application.properties # H2 isolated test environment properties
│   ├── pom.xml                       # Maven dependencies & build plugins
│   ├── mvnw                          # Linux/macOS Maven wrapper script
│   ├── mvnw.cmd                      # Windows Maven wrapper script
│   ├── .env                          # Local backend environment variables
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── assets/                   # Static icons and imagery
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Navbar.jsx            # Top navigation bar & actions
│   │   │   ├── StatsCard.jsx         # Metric card with badge & icons
│   │   │   └── DashboardPlaceholder.jsx # Funnel charts & sample applications
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx     # Main Dashboard view
│   │   ├── services/
│   │   │   └── api.js                # Axios client with interceptors
│   │   ├── hooks/
│   │   │   └── useDashboardStats.js  # Dashboard state management hook
│   │   ├── utils/
│   │   │   └── constants.js          # Statuses, colors, and static definitions
│   │   ├── App.jsx                   # Application shell & footer
│   │   ├── App.css
│   │   ├── index.css                 # Dark theme design system & glassmorphism
│   │   └── main.jsx                  # React DOM mount point
│   ├── index.html                    # HTML entry point with fonts
│   ├── vite.config.js                # Vite build and port config (port 5173)
│   ├── package.json                  # NPM dependencies and scripts
│   ├── .env                          # Local frontend environment variables
│   ├── .env.example                  # Template for frontend environment variables
│   └── .gitignore
├── .env.example                      # Root environment variables template
├── .gitignore                        # Global repository gitignore
└── README.md                         # Project documentation
```

---

## ⚙️ Prerequisites

Before running the application, make sure you have the following installed on your system:

1. **Java Development Kit (JDK 21 LTS)**
   ```bash
   java -version
   ```
2. **Node.js (v18.x or v20.x+) & npm**
   ```bash
   node -v
   npm -v
   ```
3. **PostgreSQL 15+ / 16+** running locally on port `5432`
   ```bash
   psql --version
   ```
4. **Git**
   ```bash
   git --version
   ```

---

## 🗄️ Database Setup (PostgreSQL)

1. Start your local PostgreSQL service (or ensure the PostgreSQL service is running).
2. Connect to PostgreSQL using `psql` or pgAdmin:
   ```bash
   psql -U postgres -h localhost -p 5432
   ```
3. Create the database `jobtrack_db`:
   ```sql
   CREATE DATABASE jobtrack_db;

   -- Verify creation
   \l
   ```

---

## 🔐 Environment Variables

Database credentials, server ports, and base API URLs are externalized using environment variables.

### Full-Stack Environment Template (`.env.example`)

```env
# Server Port (default 8080)
PORT=8080

# PostgreSQL Database Connection
DB_URL=jdbc:postgresql://localhost:5432/jobtrack_db
DB_USERNAME=postgres
DB_PASSWORD=1234

# Frontend Base API URL
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend Variables (`backend/.env`)

```env
SERVER_PORT=8080
DB_URL=jdbc:postgresql://localhost:5432/jobtrack_db
DB_USERNAME=postgres
DB_PASSWORD=1234
```

| Variable | Description | Default Local Value |
| :--- | :--- | :--- |
| `DB_URL` | JDBC URL for PostgreSQL database | `jdbc:postgresql://localhost:5432/jobtrack_db` |
| `DB_USERNAME` | PostgreSQL database username | `postgres` |
| `DB_PASSWORD` | PostgreSQL database password | `1234` |
| `PORT` / `SERVER_PORT` | Backend web server port | `8080` |

### Frontend Variables (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base endpoint for Axios backend requests | `http://localhost:8080/api` |

---

## 🚀 Getting Started & Running Locally

### 1. Backend Setup (Spring Boot)

Navigate to the `backend/` directory:
```bash
cd backend
```

#### Run with Maven Wrapper:
- **Windows (PowerShell or CMD)**:
  ```powershell
  .\mvnw.cmd spring-boot:run
  ```
- **macOS / Linux**:
  ```bash
  chmod +x mvnw
  ./mvnw spring-boot:run
  ```

#### Run Backend Tests:
Automated tests run against an **isolated H2 in-memory database** so your local PostgreSQL data remains completely untouched:
```bash
# Windows
.\mvnw.cmd test

# macOS / Linux
./mvnw test
```

The Spring Boot backend will start on **`http://localhost:8080`**.

---

### 2. Frontend Setup (React + Vite)

Open a new terminal window and navigate to the `frontend/` directory:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Start Vite dev server:
```bash
npm run dev
```

The frontend will be accessible at **`http://localhost:5173`**.

---

## 📜 Available Scripts & Commands

### Backend (`/backend`)
| Command | Description |
| :--- | :--- |
| `./mvnw spring-boot:run` | Runs the Spring Boot application locally |
| `./mvnw test` | Executes JUnit 5 tests against the H2 in-memory database |
| `./mvnw clean package -DskipTests` | Builds the production executable `.jar` in `target/` |
| `./mvnw clean` | Cleans previously compiled artifacts |

### Frontend (`/frontend`)
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with Hot Module Replacement (HMR) at port `5173` |
| `npm run build` | Compiles optimized production bundle into `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Runs `oxlint` fast linter on JavaScript code |

---

## 📡 API Architecture & Endpoints

The backend exposes a modular REST API structured around the `/api` prefix:

### 1. Job Applications (`/api/applications`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/applications` | Retrieve list of all job applications with pagination & filters |
| `POST` | `/api/applications` | Create a new tracked application |
| `GET` | `/api/applications/{id}` | Get details of a single application |
| `PUT` | `/api/applications/{id}` | Update application details or progress status |
| `DELETE` | `/api/applications/{id}` | Delete a tracked application |

### 2. Dashboard & Analytics (`/api/analytics`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/metrics` | Retrieve summary counts (total, interviews, offers, rejected) |
| `GET` | `/api/analytics/funnel` | Monthly velocity and interview conversion data for charts |

### 3. Interview Rounds (`/api/interviews`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/interviews` | List upcoming interviews and deadlines |
| `POST` | `/api/interviews` | Schedule an interview for an application |
| `PATCH` | `/api/interviews/{id}` | Update status, interview date, or interviewer notes |

---

## 🎨 UI & Aesthetics

- **Color Palette**: Deep dark background (`#090d16`), rich card surfaces (`#111827`), glowing primary indigo accents (`#6366f1`), cyan highlights (`#06b6d4`), and status-mapped semantic colors.
- **Glassmorphism**: Translucent cards with subtle borders (`rgba(255, 255, 255, 0.08)`) and backdrop blur effects.
- **Interactive Micro-animations**: Smooth hover transitions on cards, interactive Recharts SVG tooltips, and gradient buttons.
- **Typography**: Clean, high-legibility system fonts styled via Bootstrap utilities.

---

## 🗺️ Roadmap & Development Phases

- [x] **Phase 1: Project Structure & Environment Setup**
  - Spring Boot 3.3.5 with Maven & PostgreSQL driver setup
  - React 19 + Vite dashboard with dark glassmorphism
  - Axios API client with interceptors
  - Recharts integration & Lucide icons
  - H2 test isolation suite
- [ ] **Phase 2: Core Entities & REST APIs**
  - Database schema & JPA entities (`Application`, `Job`, `Interview`, `Company`)
  - Repositories, Services, and REST Controllers
  - Request validation (`@Valid`, constraints) and Global Exception Handler
- [ ] **Phase 3: External Job Search API Integration**
  - Integration with external job search APIs (e.g. Adzuna, JSearch, or GitHub Jobs API)
  - Search, filter, and "Save to My Tracker" one-click action
- [ ] **Phase 4: Interview Scheduler & Reminders**
  - Multi-round interview tracker with calendar notes
  - Email notification reminders for upcoming interviews
- [ ] **Phase 5: Authentication & Deployment**
  - Spring Security with JWT token authentication
  - User registration, login, and secure user-level data isolation
  - Docker containerization (`Dockerfile` & `docker-compose.yml`)

---

## ❓ Troubleshooting & FAQ

### 1. `Access denied for user 'postgres'@'localhost'`
- **Cause**: PostgreSQL credentials mismatch or password not set.
- **Solution**: Set the environment variable `$env:DB_PASSWORD="your_password"` in PowerShell or `export DB_PASSWORD="your_password"` in bash before starting Spring Boot, or configure it in `backend/.env`.

### 2. `Connection to localhost:5432 refused`
- **Cause**: PostgreSQL service is not running on port `5432`.
- **Solution**:
  - **Windows**: Check Services (`services.msc`), ensure PostgreSQL service is "Running".
  - **Linux**: `sudo systemctl start postgresql`
  - **macOS**: `brew services start postgresql`

### 3. Port `8080` is already in use
- **Cause**: Another service or an existing Spring Boot process is holding port `8080`.
- **Solution**:
  ```powershell
  # Windows PowerShell
  netstat -ano | findstr :8080
  taskkill /F /PID <PID_FOUND>
  ```
  Or change `server.port=8081` in `application.properties` and update `VITE_API_BASE_URL` in `frontend/.env`.

### 4. Port `5173` is already in use
- **Cause**: Another Vite instance is active.
- **Solution**: Vite will automatically offer port `5174`, or you can terminate the conflicting process.

### 5. Java Version Error (`Unsupported class file major version`)
- **Cause**: Running with Java 17 or older.
- **Solution**: Ensure Java 21 is active: `java -version`. Set `JAVA_HOME` to your JDK 21 installation path.

---

## 📄 Contributing & License

Contributions are welcome! Please feel free to submit a pull request or open an issue for feature suggestions.

This project is licensed under the [MIT License](LICENSE).
