# Admin Dashboard – MEAN Stack

A full-featured **Admin Dashboard application** built using the **MEAN stack (MongoDB, Express.js, Angular, Node.js)**.  
This project provides secure admin authentication, analytics dashboards, interactive charts, auto-sync, and separate user/admin flows for testing and management.
---

## SET UP
```
git clone https://github.com/Aquibyounis/smartwinnr_project.git
```
### Frontend
```
cd admin
npm install
ng serve
```
## Backend
```
cd backend
npm install
npm start
```
---

## ✨ Key Features

### 🔐 Authentication
- Secure **Admin Login** using JWT
- Protected backend APIs via middleware
- Automatic redirect to login if token is missing or expired

### 👥 User Management
- Dedicated **User Signup** route for testing
- Used to manually create users
- Helps populate **User Growth analytics**
- No admin access required for signup

### 📊 Dashboard Metrics
- Total Users
- Total Sales Revenue
- Active Users (derived dynamically)

### 📈 Interactive Charts (Chart.js)
- **Sales Overview**
  - Daily (Last 30 Days)
  - Monthly (Last 12 Months)
  - Yearly (Last 5 Years)
- **User Growth**
  - Daily / Monthly / Yearly filters
- Smooth animations, tooltips, and dynamic updates

### 🔄 Manual Auto Sync (No Page Reload)
- **Sync button** in the navbar
- Fetches latest data from backend APIs
- Updates stats and charts instantly
- No full page refresh required

### 🎨 UI / UX
- Responsive layout
- Modern card-based dashboard
- Styled dropdown selectors
- Clean admin-friendly interface

---

## 🧱 Tech Stack

### Frontend
- Angular
- Chart.js
- RxJS
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 🔀 Application Routes

### 👤 User Side (for creating USER account)

- **Signup Page**  
  `http://localhost:4200/signup`

Purpose:
- Manually create users
- Populate User Growth charts
- No admin authentication required

---

### 🔐 Admin Side

- **Admin Login**  
  `http://localhost:4200/admin/login`

- **Admin Dashboard**  
  `http://localhost:4200/admin`

Notes:
- Admin login required
- Dashboard accessible only after authentication
---


# PULA AQUIB YOUNIS