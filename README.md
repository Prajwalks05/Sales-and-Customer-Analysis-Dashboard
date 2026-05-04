# 📊 Sales and Customer Analysis Dashboard

A full-stack, containerized web application designed to provide a centralized, interactive platform for monitoring key performance indicators (KPIs), sales metrics, and customer demographics.

## 🚀 Features

- **Interactive Dashboard:** Dynamic, real-time data visualization for complex sales datasets.
- **Microservices Architecture:** Decoupled React frontend and Node/Express backend.
- **Cloud Database:** Seamless integration with MongoDB Atlas.
- **Fully Containerized:** Custom Docker images for both frontend and backend environments.
- **Enterprise Deployment:** Configured for serverless deployment on AWS ECS Fargate and Amazon ECR.

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **DevOps & Cloud:** Docker, AWS Elastic Container Registry (ECR), AWS Elastic Container Service (ECS), AWS Fargate

## 📸 Gallery

<p align="center">
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR3.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR3.jpg?raw=true" width="400" alt="Screenshot 1" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR4.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR4.jpg?raw=true" width="400" alt="Screenshot 2" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR5.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR5.jpg?raw=true" width="400" alt="Screenshot 3" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR11.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR11.jpg?raw=true" width="400" alt="Screenshot 4" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR15.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR15.jpg?raw=true" width="400" alt="Screenshot 5" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR16.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR16.jpg?raw=true" width="400" alt="Screenshot 6" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR17.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR17.jpg?raw=true" width="400" alt="Screenshot 7" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR18.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR18.jpg?raw=true" width="400" alt="Screenshot 8" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR19.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR19.jpg?raw=true" width="400" alt="Screenshot 9" />
  </a>
  <hr>
  <a href="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR20.jpg?raw=true">
    <img src="https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard/blob/main/images/ECR20.jpg?raw=true" width="400" alt="Screenshot 10" />
  </a>
  <hr>
</p>

## 💻 Local Development Setup

To run this project locally, ensure you have **Node.js** and **Docker** installed on your machine.

### 1. Clone the repository

Bash

```
git clone https://github.com/Prajwalks05/Sales-and-Customer-Analysis-Dashboard
cd Sales-and-Customer-Analysis-Dashboard

```

### 2. Environment Variables

Create a `.env` file in both the `/frontend` and `/backend` directories.

**Backend (`backend/.env`):**

Code snippet

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

```

**Frontend (`frontend/.env`):**

Code snippet

```
REACT_APP_API_URL=http://localhost:5000/api

```

### 3. Running with Docker

Build and run the containers directly from the root directory:

**Backend:**

Bash

```
cd backend
docker build -t analytics-backend .
docker run -p 5000:5000 analytics-backend

```

**Frontend:**

Bash

```
cd frontend
docker build -t analytics-frontend .
docker run -p 3000:80 analytics-frontend

```

## ☁️ Cloud Deployment (AWS)

This application is configured for deployment on AWS using serverless Fargate containers.

1.  Authenticate with AWS CLI.
2.  Push Docker images to Amazon ECR.
3.  Update `REACT_APP_API_URL` to the ephemeral public IP of the backend Fargate task.
4.  Deploy updated images via ECS Task Definitions and Services.

## 📝 License

This project is licensed under the MIT License.
