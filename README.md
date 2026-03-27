
## TASK MANAGER
A full-stack Task Manager application built using React, Spring Boot, and MySQL, fully containerized using Docker and automated with CI/CD.


## Tech Stack

- Frontend: React (Vite)
- Backend: Spring Boot
- Database: MySQL
- Containerization: Docker & Docker Compose
- CI/CD: GitHub Actions
- Version Control: Git & GitHub


## Features

## User
- Register & Login
- Create tasks
- Update task status (TODO → IN_PROGRESS → DONE)
- View own tasks
- -delete own tasks
- Filter tasks by status

## Admin
- View all users
- View all tasks
- Filter tasks by user
- Filter tasks by status
- Delete tasks

## API Design
 ## Auth
- POST /api/auth/register → Register user
- POST /api/auth/login → Login
 ## Tasks
- GET /api/tasks → Get tasks (filters supported)
- POST /api/tasks → Create task
- PUT /api/tasks/{id} → Update task
- DELETE /api/tasks/{id} → Delete task
 ## Users (Admin only)
- GET /api/users → List all users



 ## Database Design (ERD)

## Users Table:

- id (PK)
- name
- email (unique)
- password
- role (ADMIN / USER)

## Tasks Table:

- id (PK)
- title
- description
- status (TODO, IN_PROGRESS, DONE)
- assignedTo (FK)
- createdBy (FK)
  ## VERIFICATION
Step 1: Clone the repository

```bash
git clone https://github.com/prathiksha124/taskmanager.git
cd taskmanager
Step 2: Run using Docker Compose
docker-compose up --build

 ## Application URLs

Frontend:
http://localhost:5173

Backend:
http://localhost:8080

 # Test Credentials
Admin

Email: admin@gmail.com

Password: 1234

User

Email: user1@gmail.com

Password: 1234

## CI/CD Pipeline

GitHub Actions is used to automate:

Backend build (Maven)
Frontend build (React)
Docker image creation
Push to Docker Hub
##  Docker Hub Images
Backend: prathiksha0326/taskmanager-backend
Frontend: prathiksha0326/taskmanager-frontend

## verification
Clone repository
Run:
docker-compose up --build
Open browser:
http://localhost:5173
Test login, tasks, filters
