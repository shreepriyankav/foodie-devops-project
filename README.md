# 🍔 Foodie - Full DevOps Dockerized Project

A food delivery app (Foodie) built to demonstrate a complete containerized 3-tier
architecture using Docker Compose — Nginx (frontend) → Spring Boot (backend) → PostgreSQL (database).

## 📐 Architecture

```
USER
  |
  | HTTP :80
  v
┌─────────────────┐
│  NGINX           │
│  Frontend         │
│  Container         │
└────────┬────────┘
         | /api/*  (reverse proxy)
         | HTTP :8080
         v
┌─────────────────┐
│  JAVA APP         │
│  Spring Boot       │
│  Container         │
└────────┬────────┘
         | PostgreSQL :5432
         v
┌─────────────────┐
│  POSTGRESQL       │
│  DB Container       │
└─────────────────┘
```

- **Frontend**: Static HTML/CSS/JS served by Nginx. Nginx reverse-proxies any `/api/*`
  request to the backend container over the internal Docker network.
- **Backend**: Spring Boot REST API (`/api/dishes`, `/api/health`) using Spring Data JPA.
- **Database**: PostgreSQL with a persistent Docker volume, seeded with sample dishes on
  first startup.

## 📁 Project Structure

```
foodie-devops-project/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── html/
│       ├── index.html      (Home page)
│       ├── menu.html       (Menu page)
│       ├── cart.html       (Cart page)
│       ├── css/style.css
│       └── js/app.js
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/foodie/app/
│       ├── FoodieApplication.java
│       ├── model/Dish.java
│       ├── repository/DishRepository.java
│       └── controller/DishController.java
├── docs/
│   └── ui-ux-mockup.png    (UI/UX design reference)
└── README.md
```

## 🚀 Run Locally

Requirements: Docker + Docker Compose installed.

```bash
git clone <your-repo-url>
cd foodie-devops-project
docker-compose up --build
```

Then open:
- Frontend: http://localhost
- Backend API: http://localhost:8080/api/dishes
- Backend health: http://localhost:8080/api/health

To stop:
```bash
docker-compose down          # stop containers
docker-compose down -v       # stop and wipe DB volume
```

## 🔌 API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|-----------------------|
| GET    | /api/dishes       | List all dishes       |
| GET    | /api/dishes/{id}  | Get one dish          |
| POST   | /api/dishes       | Add a new dish        |
| DELETE | /api/dishes/{id}  | Delete a dish         |
| GET    | /api/health       | Health check          |

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Nginx
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA
- **Database**: PostgreSQL 16
- **DevOps**: Docker, Docker Compose (Jenkins CI/CD & AWS deployment - next steps below)

## 📌 Next Steps (Full DevOps Pipeline)

1. ✅ Dockerize frontend, backend, database (done here)
2. ⬜ Push code to GitHub
3. ⬜ Set up Jenkins pipeline: on git push → build Docker images → push to Docker Hub
4. ⬜ Deploy to AWS EC2 (or ECS) using `docker-compose up` / ECS task definitions
5. ⬜ (Optional) Add Nginx SSL, monitoring with Prometheus + Grafana

## 🖼️ UI/UX Reference

<img width="1912" height="712" alt="image" src="https://github.com/user-attachments/assets/ca5c84e4-d2eb-4418-afcc-64221ccffa49" />

<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/1ecbfc81-5678-4378-8a8e-730d931ac5d8" />

<img width="1566" height="701" alt="image" src="https://github.com/user-attachments/assets/31944c19-ff6b-464f-aa1e-0fd228d5692a" />

<img width="1207" height="712" alt="image" src="https://github.com/user-attachments/assets/a9eafd89-8996-4580-8063-0a9995dbe686" />

<img width="1897" height="663" alt="image" src="https://github.com/user-attachments/assets/2001080f-910e-4254-9d1d-0168e674189c" />

<img width="1895" height="580" alt="image" src="https://github.com/user-attachments/assets/17f33033-2dfb-46fc-8fd7-d042df86cb28" />









