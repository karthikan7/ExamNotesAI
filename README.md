# 🎓 ExamNotes AI - AI-Powered Study & Revision Assistant

ExamNotes AI is an intelligent full-stack web application that generates exam-focused study notes, revision cheat-sheets, interactive Mermaid flow diagrams, Recharts visual analytics, and printable PDFs using Gemini AI.

---

## ✨ Features

- **⚡ AI Exam Note Generation**: Converts any study topic, grade level, and exam target into high-yield study notes powered by Google Gemini AI.
- **⏱️ 5-Minute Quick Revision Mode**: Generates bullet-point summaries, definitions, and key formulas for last-minute exam prep.
- **📊 Visual Flowcharts & Charts**: Dynamic Mermaid.js flow diagrams and interactive Recharts graphs.
- **📑 Free PDF Export**: Download formatted, ready-to-print study PDFs using PDFKit.
- **🔐 Google OAuth Authentication**: Single-click secure Google authentication with Firebase & JWT session cookies.
- **💠 Credit Management & Payments**: Integrated credit system with optional Stripe Checkout payment gateway.
- **📚 Revision History**: Saves user-generated notes in MongoDB for future review.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4 + Motion (Framer Motion)
- **Data Visualization**: Recharts & Mermaid.js
- **Auth**: Firebase Google Auth

### Backend
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Google Gemini API (`gemini-1.5-flash`)
- **PDF Generation**: PDFKit
- **Payments**: Stripe Node SDK
- **Security**: JWT & HTTP-only Cookies

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Connection URI
- Google Gemini API Key

---

### 📥 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ExamNotesAI.git
   cd ExamNotesAI
   ```

2. **Configure Environment Variables**

   **Server Setup (`server/.env`)**:
   ```env
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLIENT_URL=http://localhost:5173
   ```

   **Client Setup (`client/.env`)**:
   ```env
   VITE_FIREBASE_APIKEY=your_firebase_api_key
   ```

3. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

4. **Run the Application**

   - **Backend Server**:
     ```bash
     cd server
     npm run dev
     ```
     Server will start on `http://localhost:8000`

   - **Frontend App**:
     ```bash
     cd client
     npm run dev
     ```
     Frontend will start on `http://localhost:5173`

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/google` | Authenticate user with Google | ❌ |
| `GET` | `/api/auth/logout` | Clear auth cookie | ❌ |
| `GET` | `/api/user/currentuser` | Fetch active user profile & credits | ✅ |
| `POST` | `/api/notes/generate-notes` | Generate notes via Gemini AI | ✅ |
| `GET` | `/api/notes/getnotes` | Fetch user's saved notes history | ✅ |
| `GET` | `/api/notes/:id` | Fetch specific note details | ✅ |
| `POST` | `/api/pdf/generate-pdf` | Stream generated PDF document | ✅ |
| `POST` | `/api/credit/order` | Create Stripe checkout session | ✅ |

---

## 📝 License
This project is licensed under the MIT License.
