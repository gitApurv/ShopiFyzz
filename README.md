# 🛒 Shopifyzz

**Shopifyzz** is a modern, full-stack e-commerce web application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It provides a complete platform for users to shop, manage their carts and orders, and even contribute products to the catalog.

This app focuses on secure user authentication, product and order management, email notifications, PDF receipt generation, and media uploads — all wrapped in a beautiful, responsive UI powered by **Material UI**.

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Secure login system using **JWT**
  - Passwords hashed with **bcrypt**

- 🛍️ **Shopping Experience**
  - Browse all products with clean UI
  - Add/remove items from the cart
  - Place orders with real-time order tracking
  - View detailed order information

- 📤 **Product Contribution**
  - Users can add new products to the catalog
  - Edit or delete their own products
  - Upload/edit product images via **Cloudinary**

- 📧 **Email Notifications**
  - Signup confirmation email sent using **Nodemailer**

- 🧾 **Receipt Generation**
  - PDF invoices generated after successful orders using **PDFKit**

- 💅 **Modern UI**
  - Fully responsive interface using **Material UI**
  - Clean, intuitive design optimized for desktop and mobile

## 🧰 Tech Stack

### 🌐 Frontend
- **React.js** – Component-based architecture
- **Material UI** – Modern and responsive UI components
- **React Router DOM** – Client-side routing
- **Netlify** – Deploys the React frontend with automatic CI/CD

### 🖥️ Backend
- **Node.js** – Runtime environment
- **Express.js** – Lightweight backend framework
- **MongoDB** – NoSQL database for storing users, products, and orders
- **Mongoose** – ODM for MongoDB with schema validation
- **Render** – Deploys the backend API and handles server hosting

### 🔐 Authentication & Security
- **JWT** – JSON Web Tokens for secure authentication
- **bcrypt.js** – Hashing passwords securely

### 📧 Communication & Documents
- **Nodemailer** – Sends signup confirmation emails
- **PDFKit** – Generates downloadable PDF receipts after purchase

### ☁️ Media & File Handling
- **Cloudinary** – For image uploads and cloud storage

### ⚙️ Dev Tools & Others
- **dotenv** – Manage environment variables
- **Postman** – For API testing during development
- **Concurrently** – Runs frontend and backend together in dev mode
