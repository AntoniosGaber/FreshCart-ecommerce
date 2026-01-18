# FreshCart E-commerce 🛒

🌍 **Live Demo**  
🔗 https://fresh-cart-ecommerce-topaz.vercel.app

A production-ready **e-commerce web application** featuring authentication, protected routes, product browsing, cart management, and checkout flow.  
Built with **React 18**, **Vite**, and **Tailwind CSS**, and deployed on **Vercel** with GitHub CI/CD integration.

---

## 🚀 Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **Context API**
- **Vercel (Deployment)**

---
## 🧠 Architecture Overview

The application is built as a client-side React Single Page Application (SPA) that consumes a RESTful e-commerce API.

Authentication is handled using JWT tokens stored in localStorage for simplicity in a frontend-only demo. Tokens are attached to API requests via Axios interceptors to protect authenticated routes.  
In a production-grade system, HttpOnly cookies would be preferred for improved security.

Global state such as authentication status and cart data is managed using React Context API to keep the application lightweight without introducing Redux.


## ✨ Features

- JWT-based authentication with protected routes (login / register / password reset)
- Product listing and detailed product pages
- Categories and brands browsing
- Cart management (add / remove / update items)
- Checkout flow
- Responsive design (mobile-first)
- Production deployment on Vercel


---

## 📁 Project Structure
src/
├── components/
├── context/
├── hooks/
├── assets/
├── pages/
└── routes/ 

---
## 🛠️ Installation & Setup

```bash
npm install
npm run dev


## ⚠️ Known Limitations & Future Improvements

- No backend ownership (relies on external API)
- No refresh token or session persistence beyond localStorage
- No automated testing yet (Jest / React Testing Library planned)
- Future improvements include role-based access, improved error handling, and performance optimizations

👤 Author

Antonios Gaber
🔗 https://github.com/AntoniosGaber


