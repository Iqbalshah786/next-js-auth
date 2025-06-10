# 🔐 NextAuth - Full-Stack Authentication System

A comprehensive authentication system built with **Next.js 15** featuring secure user registration, login, email verification, and password reset functionality.

## 🤖 Development Approach

- **Frontend**: Built entirely using **VS Code Agent Mode** powered by **Claude Sonnet 4**
- **Backend**: Developed as a hands-on learning project to understand authentication fundamentals

## ✨ Features

- 🔑 **Complete Auth Flow**: Sign up, login, logout with JWT tokens
- 📧 **Email Verification**: Secure email confirmation with token-based verification
- 🔄 **Password Reset**: Forgot password functionality with email links
- 🛡️ **Route Protection**: Middleware-based route guards and redirects
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and Lucide icons
- ✅ **Form Validation**: Client-side validation using Zod schemas
- 🍪 **Secure Cookies**: HTTP-only, secure JWT cookie management
- 📱 **Responsive Design**: Mobile-first, fully responsive interface

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs, HTTP-only cookies
- **Email**: Nodemailer with SMTP support
- **Validation**: Zod schemas for type-safe forms
- **UI Components**: Lucide React icons, custom components

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/Iqbalshah786/next-js-auth
cd auth_nextjs
npm install
# or
pnpm install
```

Set up your environment variables by creating a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
DOMAIN=http://localhost:3000

# Email configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=abc123
SMTP_PASS=abc123
SMTP_FROM=your_email_password
EMAIL=your_email
PASSWORD=abc123
EMAIL_SERVICE=gmail
```

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/users/          # Authentication API routes
│   ├── login/              # Login page
│   ├── signup/             # Registration page
│   ├── profile/            # Protected profile pages
│   ├── verifyemail/        # Email verification page
│   ├── resetpassword/      # Password reset page
│   └── forgotpassword/     # Forgot password page
├── helpers/                # Utility functions
├── models/                 # MongoDB models
└── middleware.ts           # Route protection middleware
```

## 🎯 Learning Outcomes

This project demonstrates authentication patterns, secure token handling, email integration, and full-stack development best practices using the latest Next.js features.

_Built with AI assistance (Claude Sonnet 4) for frontend development and traditional coding for backend implementation._
