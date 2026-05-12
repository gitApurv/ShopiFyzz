# 🛒 ShopiFyzz - MERN E-Commerce Application

<div align="center">

**🚀 Scalable full-stack e-commerce application with authentication, order management, and modern UI.**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/gitApurv/ShopiFyzz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

ShopiFyzz is a full-stack MERN e-commerce application that brings the real shopping experience online. It enables users to browse products, manage carts, place orders, and generate digital receipts — all within a sleek and responsive interface.

## 🔗 Live Demo

| Service            | URL                                                          |
| ------------------ | ------------------------------------------------------------ |
| 🌐 **Frontend**    | [ShopiFyzz Client (Netlify)](https://shopifyzz.netlify.app/) |
| ⚙️ **Backend API** | [ShopiFyzz Server (Render)](https://shopifyzz.onrender.com)  |

## ✨ Key Features

- 🔐 **Secure JWT Authentication** - Token-based secure user sessions
- 🛍 **Product & Order Management** - Full CRUD operations for products and orders
- 🛒 **Smart Cart Functionality** - Real-time cart updates and persistence
- 📄 **PDF Invoice Generation** - Automatic receipt generation with PDFKit
- ☁️ **Cloud Image Storage** - Cloudinary integration for product images
- 📬 **Email Notifications** - Automated emails with Nodemailer
- 🎨 **Responsive UI** - Modern design with Material UI and Vite
- 👨‍💼 **Admin Dashboard** - Product and order management interface

## 🛠 Tech Stack

| Layer          | Technologies                         |
| -------------- | ------------------------------------ |
| **Frontend**   | React.js, Vite, Material UI, Axios   |
| **Backend**    | Node.js, Express.js, JWT, bcrypt     |
| **Database**   | MongoDB                              |
| **Services**   | Cloudinary, Nodemailer, PDFKit       |
| **Deployment** | Netlify (Frontend), Render (Backend) |

## 📂 Project Structure

```
ShopiFyzz/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API for state management
│   │   ├── api/           # API service calls
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/                 # Node.js backend application
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middlewares
│   ├── helpers/           # Utility functions
│   ├── app.js
│   └── package.json
└── README.md

```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud)
- **Cloudinary** account for image uploads
- **Gmail** account for Nodemailer setup

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gitApurv/ShopiFyzz.git
   cd ShopiFyzz
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create `.env` files for both client and server with the following variables:

**Server** (`.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
GMAIL_APP_USERNAME=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

**Client** (`.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD=your_cloudinary_cloud
```

## 🏃 Running the Application

### Development Mode

**Start the server** (from `server/` directory)

```bash
npm run dev
```

**Start the client** (from `client/` directory)

```bash
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Production Build

**Build client**

```bash
cd client
npm run build
```

**Start server in production**

```bash
cd server
npm start
```

## 📚 API Documentation

The backend API provides endpoints for:

- **Authentication**: `/api/auth/*` - Register, Login, Forgot Password, Reset Password
- **Products**: `/api/products/*` - Browse, Filter, Search products
- **Orders**: `/api/orders/*` - Create, View, Track orders
- **Cart**: `/api/cart/*` - Add, Remove, Update cart items
- **Admin**: `/api/admin/*` - Manage products and orders

For detailed API documentation, refer to the route files in `server/routes/`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Apurv** - Full-Stack Developer

- GitHub: [@gitApurv](https://github.com/gitApurv)

---

<div align="center">

**A fully functional MERN e-commerce web app with authentication, order management, and deployment — showcasing strong full-stack development skills.**

</div>
