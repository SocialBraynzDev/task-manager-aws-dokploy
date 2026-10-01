# Full-Stack Task Manager (AWS EC2 + Dokploy Deployment Course)

A lightweight full-stack application built to demonstrate end-to-end containerized deployment on **AWS EC2** using **Dokploy**.

## 🏗️ Architecture

```text
                    Internet
                       │
                       ▼
                  Domain / DNS
                       │
                       ▼
                 AWS EC2 Server
                       │
                    Dokploy
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
      Frontend      Backend      PostgreSQL
     (React+Nginx) (Express API) (Database)
          │            │            │
          └────────────┴────────────┘
                  Docker Network
```

## 📁 Project Structure

```text
task-manager/
├── frontend/             # React (Vite) UI + Nginx Dockerfile
│   ├── src/
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── backend/              # Node.js + Express REST API + PostgreSQL Pool
│   ├── src/index.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Local multi-container orchestration
├── .gitignore
└── README.md
```

## 🚀 Running Locally with Docker Compose

```bash
# 1. Start all 3 services (Database, Backend, Frontend)
docker compose up --build -d

# 2. View logs
docker compose logs -f

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/tasks
# Health Check: http://localhost:5000/health
```
