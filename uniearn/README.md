# UniEarn – Increment 1 (Login / Sign-up dashboard)

Spring Boot 3 (Java 17) + MySQL backend, React (Vite) frontend.
Maven metadata: groupId `com.csit321section.groupname`, artifactId `projectname`.

## What you need installed
1. JDK 17 or newer (21 is fine)
2. Maven 3.9+ (or use IntelliJ IDEA, which bundles Maven)
3. Node.js 18+ (includes npm)
4. MySQL 8 (or XAMPP/MariaDB), running on port 3306

## 1. Database (manual)
- Start MySQL. The backend auto-creates the `uniearn_db` database and tables on first run.
- If your MySQL `root` user has a password, edit `backend/src/main/resources/application.properties`
  (`spring.datasource.password=`), or set env var `DB_PASSWORD`.
- Optional: run `database/schema.sql` in MySQL Workbench/phpMyAdmin to create the tables by hand.

## 2. Backend
```
cd backend
mvn spring-boot:run
```
Runs at http://localhost:8080. (IntelliJ: open the `backend` folder, run `ProjectnameApplication`.)

## 3. Frontend
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. If the backend is not on port 8080, copy `.env.example` to `.env` and edit it.

## 4. Test end-to-end
1. Go to /register, create a Student account (school + course) -> you land on the dashboard.
2. Log out, log in again with the same email/password.
3. Refresh the page while logged in -> you stay logged in.
4. Register an Employer account -> dashboard shows company and "Not verified yet".
5. Try a wrong password -> "Invalid email or password". Re-use an email -> "already registered".
6. Check MySQL: `SELECT id,name,email,role,LEFT(password,7) FROM users;` (password is a BCrypt hash).

API: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me (Bearer token).

## How this grows into full CRUD
Pattern per entity: `model/X.java` -> `repository/XRepository.java` -> `service/XService.java`
-> `controller/XController.java` (+ DTO records), and on the frontend one page under `src/pages`
using the shared `api()` helper and `<ProtectedRoute roles={[...]}>`.

| ERD entity | Status | Planned endpoints / role |
|---|---|---|
| USER, STUDENT, EMPLOYER | Done (create + read) | profile update/delete later |
| CLASS_SCHEDULE | Later | /api/schedule (STUDENT) |
| JOB | Later | /api/jobs (EMPLOYER writes, STUDENT reads) |
| APPLICATION | Later | /api/applications |
| SAVED_JOB | Later | /api/saved-jobs (STUDENT) |
| RATING, BADGE, EXPERIENCE | Later | created by rating flow |

Role rules go in `SecurityConfig` (see the comment there). No existing file needs rewriting.
