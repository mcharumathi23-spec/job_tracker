# Mini JobTrack — Job Application Management Dashboard

Mini JobTrack is a modern full-stack application designed to empower job seekers to discover job listings from external APIs, track personalized application statuses, schedule and prepare for interviews, and gain actionable career pipeline analytics.

> **Project Phase**: **Phase 1 — Project Structure & Environment Setup**  
> *This phase establishes the foundational project structure, build configurations, and development environment. Feature logic, database entities, REST endpoints, external API integrations, and authentication will be added in subsequent phases.*

---

## 1. Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) using [Vite](https://vite.dev/)
- **Language**: JavaScript (ESModules)
- **UI & Styling**: [Bootstrap 5.3](https://getbootstrap.com/) with custom glassmorphism and modern dark design tokens
- **HTTP Client**: [Axios](https://axios-http.com/) (configured with environment-based base URL and future JWT interceptors)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Java 21 LTS](https://www.oracle.com/java/technologies/downloads/#java21)
- **Framework**: [Spring Boot 3.3.5](https://spring.io/projects/spring-boot)
- **Build Tool**: Apache Maven (includes Maven Wrapper `mvnw` & `mvnw.cmd`)
- **Web**: Spring Web (`spring-boot-starter-web`)
- **Persistence**: Spring Data JPA (`spring-boot-starter-data-jpa`) with Hibernate 6
- **Database Driver**: MySQL Connector/J (`mysql-connector-j`)
- **Validation**: Spring Boot Validation (`spring-boot-starter-validation`)
- **Dev Tooling**: Spring Boot DevTools
- **Testing**: JUnit 5, Spring Boot Test, H2 in-memory DB for test suite isolation
- **Architecture Readiness**: Designed for modular extension to Spring Security & JWT in Phase 2

### Database & Environment
- **Database**: MySQL 8.0+
- **Database Name**: `jobtrack_db`
- **Port Standards**: Backend `8080`, Frontend `5173`, MySQL `3306`

---

## 2. Project Directory Structure

```text
MiniJobTrack/
├── backend/
│   ├── .mvn/
│   │   └── wrapper/
│   │       ├── maven-wrapper.jar
│   │       └── maven-wrapper.properties
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jobtrack/
│   │   │   │   ├── JobTrackApplication.java
│   │   │   │   ├── config/          # Bean, CORS, and security configuration
│   │   │   │   ├── controller/      # REST API Controllers
│   │   │   │   ├── service/         # Business logic layer
│   │   │   │   ├── repository/      # Spring Data JPA repositories
│   │   │   │   ├── entity/          # JPA database entities
│   │   │   │   ├── dto/             # Request & response data transfer objects
│   │   │   │   └── exception/       # Custom exceptions & global exception handlers
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       ├── java/com/jobtrack/
│   │       │   └── JobTrackApplicationTests.java
│   │       └── resources/
│   │           └── application.properties # H2 test isolation
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── assets/                  # Static assets and icons
│   │   ├── components/              # Reusable UI components (Navbar, StatsCard, etc.)
│   │   ├── pages/                   # Application pages (DashboardPage, etc.)
│   │   ├── services/                # Axios API client and endpoints
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Constants and utility helpers
│   │   ├── App.jsx                  # Main root application shell
│   │   ├── main.jsx                 # Entry point with Bootstrap imports
│   │   ├── index.css                # Custom styling, dark mode & glassmorphism tokens
│   │   └── App.css                  # App-level styling
│   ├── index.html                   # HTML entry point with fonts & metadata
│   ├── vite.config.js               # Vite config (dev server port 5173)
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── .env                         # Local frontend environment config
│   └── .gitignore
├── .gitignore                       # Root gitignore
├── .env.example                     # Full-stack environment template
└── README.md                        # Documentation
```

---

## 3. Prerequisites

Ensure the following tools are installed on your workstation:
1. **JDK 21** (`java -version` verifies Java 21)
2. **Node.js 18+ or 20+** (`node -v`) and **npm** (`npm -v`)
3. **MySQL Server 8.0+** running locally on port `3306`
4. **Git** (`git --version`)

---

## 4. Database Setup (MySQL)

1. Start your local MySQL service (e.g. `MySQL80` on Windows).
2. Open a terminal or MySQL shell and log in as an administrator:
   ```bash
   mysql -u root -p
   ```
3. Create the database for Mini JobTrack:
   ```sql
   CREATE DATABASE IF NOT EXISTS jobtrack_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   SHOW DATABASES LIKE 'jobtrack_db';
   ```
4. Verify you have privileges to create tables and manage data inside `jobtrack_db`.

---

## 5. Environment Variables Setup

Sensitive configurations and credentials are managed strictly via environment variables.

### Root / Backend Variables
Copy `.env.example` in the root folder or set variables directly in your environment:

| Variable | Description | Default Local Value |
| :--- | :--- | :--- |
| `DB_URL` | MySQL JDBC connection string | `jdbc:mysql://localhost:3306/jobtrack_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
| `DB_USERNAME` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL user password | *(Your local MySQL password)* |
| `SERVER_PORT` / `server.port` | Backend HTTP Port | `8080` |

On Windows PowerShell:
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

On macOS / Linux:
```bash
export DB_USERNAME="root"
export DB_PASSWORD="your_mysql_password"
```

### Frontend Variables
In the `frontend/` directory, copy `.env.example` to `.env`:

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description | Default Local Value |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of backend REST API | `http://localhost:8080/api` |

---

## 6. How to Run the Applications

### A. Run Backend (Spring Boot)

Open a terminal in the `backend/` directory:

Using Maven Wrapper (recommended):
```bash
# Windows
./mvnw.cmd spring-boot:run

# macOS / Linux
./mvnw spring-boot:run
```

Or using installed Maven:
```bash
mvn spring-boot:run
```

To run automated backend tests:
```bash
./mvnw test
```

### B. Run Frontend (React + Vite)

Open a separate terminal in the `frontend/` directory:

1. Install dependencies (first time only):
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. To create a production build:
   ```bash
   npm run build
   ```

---

## 7. Expected Local URLs

| Service | URL | Notes |
| :--- | :--- | :--- |
| **Frontend Shell** | `http://localhost:5173/` | Interactive Vite React Dashboard |
| **Backend REST API** | `http://localhost:8080/` | Spring Boot 3.3.5 Application Context |
| **MySQL Server** | `localhost:3306` | Database: `jobtrack_db` |

---

## 8. Security & Configuration Hygiene

- **No Secrets in Source Control**: Credentials and passwords are parameterized with environment variables.
- **Git Ignored Files**: `.env`, `.env.local`, `target/`, `node_modules/`, `dist/`, and IDE configurations are ignored by `.gitignore`.
- **API Boundary Isolation**: No third-party API keys or sensitive backend credentials are exposed in frontend bundle code.
- **Future-Ready Security**: The modular architecture is structured to integrate Spring Security, JWT authentication filters, and protected endpoints in later phases without refactoring package structures.

---

## 9. Troubleshooting & Common Issues

### 1. `Access denied for user 'root'@'localhost'`
- **Cause**: Incorrect MySQL password or credentials not supplied.
- **Resolution**: Set the `$env:DB_PASSWORD` (Windows PowerShell) or `export DB_PASSWORD="your_password"` (Linux/macOS) in the terminal session before running the Spring Boot backend.

### 2. `Communications link failure / Connection refused`
- **Cause**: MySQL service is not running or listening on port `3306`.
- **Resolution**:
  - Windows: Verify service status with `Get-Service -Name *mysql*` and start with `Start-Service MySQL80`.
  - macOS: `brew services start mysql`
  - Linux: `sudo systemctl start mysql`

### 3. `Port 8080 is already in use`
- **Cause**: Another service or previous Spring Boot instance is holding port `8080`.
- **Resolution**:
  - Find the occupying PID:
    ```powershell
    netstat -ano | findstr :8080
    ```
  - Terminate the process:
    ```powershell
    taskkill /F /PID <PID>
    ```

### 4. `Port 5173 is already in use`
- **Cause**: Another Vite process is running.
- **Resolution**: Vite will either prompt to switch to `5174` or you can terminate the existing process.

### 5. `Class not found` or compilation issues
- **Cause**: Stale build cache or incorrect Java version.
- **Resolution**: Verify `java -version` returns Java 21, then execute `./mvnw clean install -DskipTests`.
