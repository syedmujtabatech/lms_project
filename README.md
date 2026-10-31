# Learning Management System (LMS) - Full-Stack Project

A full-stack Learning Management System (LMS) platform built with **Laravel** backend API and **React (Vite)** modern frontend.

---

## 🌟 Project Architecture

- **Backend API**: `laravel-lms/` (Laravel RESTful API, MySQL, Sanctum Authentication)
- **Frontend SPA**: `frontend/` (React + Vite + Tailwind CSS / Bootstrap, Axios)

---

## 🚀 Setup & Installation

### 1. Backend (`laravel-lms`)
```bash
cd laravel-lms
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 2. Frontend (`frontend`)
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License
This project is open-source and available under the MIT license.
