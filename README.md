# 🛒 ShopNexa – Full Stack Ecommerce Application

ShopNexa is a full-stack ecommerce web application built using **Spring Boot (Backend)** and **React + Vite (Frontend)**.  
It supports user authentication, seller product management, and public product browsing.

This project follows **real-world architecture**, **JWT-based authentication**, and **RESTful API design**, making it suitable for production-level learning and portfolio demonstration.

---

## 📁 Project Structure
I want to write a .md file for my GitHub eccomerce app but is is doing wrong write it properly with alignments and all
write all this in one place so it is easy to copy paste
# 🛒 ShopNexa – Full Stack Ecommerce Application

ShopNexa is a full-stack ecommerce web application built using **Spring Boot (Backend)** and **React + Vite (Frontend)**.  
It supports user authentication, seller product management, and public product browsing.

This project follows **real-world architecture**, **JWT-based authentication**, and **RESTful API design**, making it suitable for production-level learning and portfolio demonstration.

---

## 📂 Project Structure

```text
Ecommerce-ShopNexa/
├── backend/                         # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── shopnexa/
│   │       │           ├── controller/   # REST Controllers
│   │       │           ├── service/      # Business Logic
│   │       │           ├── repository/   # Data Access Layer
│   │       │           ├── model/        # Entity / DTO Classes
│   │       │           ├── security/     # JWT & Security Config
│   │       │           └── config/       # App Configuration
│   │       └── resources/
│   │           └── application.properties # Application Config
│   ├── build.gradle                 # Gradle Build Config
│   └── settings.gradle              # Gradle Settings
│
├── frontend/                        # React + Vite Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   ├── pages/                   # Page-Level Components
│   │   ├── context/                 # Global State (Auth, User)
│   │   ├── services/                # API Calls (Axios)
│   │   ├── routes/                   # Helper Functions
│   │   └── App.jsx                  # Root Component
│   ├── public/                      # Static Assets
│   ├── package.json                 # Frontend Dependencies
│   └── vite.config.js               # Vite Configuration
│
└── README.md                        # Project Documentation


---

## 🚀 Backend (Spring Boot)

### 🔧 Tech Stack
- Java 21
- Spring Boot
- Spring Security (JWT Authentication)
- MongoDB
- Gradle
- Lombok

### ✨ Features
- User authentication (Register / Login)
- Role-based access (SELLER / USER)
- Seller product management (Add / Update / Delete)
- Pagination & filtering
- Secure REST APIs using JWT
- Clean layered architecture (Controller / Service / Repository)

### ▶️ Run Backend
```bash
cd backend
./gradlew bootRun

Backend runs on:
http://localhost:8080

## 🎨 Frontend (React + Vite)

### 🔧 Tech Stack
- React
- Vite
- Axios
- Tailwind CSS
- React Router DOM

### ✨ Features
- User authentication (Login / Register)
- Seller dashboard
- Product listing with pagination
- Add / Edit products (Seller)
- Protected routes
- Responsive UI

### ▶️ Run Frontend
```bash
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

### 🔐 Authentication Flow
1. User logs in and receives a JWT token.
2. The token is securely stored in `localStorage`.
3. An Axios interceptor automatically attaches the token to all protected API requests.
4. The backend validates the token using Spring Security to ensure secure access.

### 🌱 Future Enhancements
- Order management system.
- Payment gateway integration.
- Product image uploads (Cloudinary / AWS S3).
- Admin dashboard with enhanced management features.
- Deployment using Docker, AWS, or Render for production-ready hosting.

---

## 👨‍💻 About the Author
**Prabhat Kumar Jha** – Full Stack Developer | Java | Spring Boot | React  

📧 Email: prabhatjha1511@gmail.com
🔗 GitHub: https://github.com/prabh1805

