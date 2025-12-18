# 🔁 Skill Exchange Platform (MERN Stack)

A full-stack **Skill Exchange Platform** where users can offer skills they know and learn skills from others through mutual exchange.

---

## 🚀 Live Features

### ✅ Core Functionalities
- User authentication (Register / Login with JWT)
- User profile management
- Skill offering & skill learning preferences
- Skill-based matching algorithm
- Session booking system
- Availability management
- In-app real-time style messaging
- Rating & review system (learner → teacher)
- Protected routes & authorization
- Responsive UI (Desktop & Mobile)

---

## 🧩 Key Features Explained

### 👤 User Profiles
- Add **skills you offer**
- Add **skills you want to learn**
- Manage **availability**
- View **average rating**

---

### 🤝 Skill Matching Algorithm
Users are matched when:
- User A’s **skills offered** ∩ User B’s **skills wanted**
- User B’s **skills offered** ∩ User A’s **skills wanted**
- Excludes self-matching

---

### 📅 Session Scheduling
- Learners can book sessions with matched users
- Prevents booking sessions with yourself
- Prevents overlapping sessions
- Sessions have statuses:
  - `upcoming`
  - `completed`
- Only participants can update session status

---

### ⭐ Rating & Review System
- Only **learners can review teachers**
- Reviews allowed **only after session completion**
- Self-review is blocked
- Average rating is calculated from reviews

---

### 💬 In-App Messaging
- One-to-one messaging system
- Conversation auto-created on first message
- Messages load instantly (polling)
- Secure access (only conversation members)

---

### 🕒 Availability Management
- Availability stored per user
- Used for session planning logic
- Prevents invalid session timings
- Designed for future calendar integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools & Services
- Git & GitHub
- Render (Deployment)
- Postman (API Testing)

---

## 📂 Project Structure

```bash
Skill-Exchange/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── skillController.js
│   │   ├── sessionController.js
│   │   ├── messageController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Session.js
│   │   ├── Conversation.js
│   │   ├── Message.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── sessionRoutes.js
│   │   ├── messageRoutes.js
│   │   └── reviewRoutes.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── utils/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```
---

## 🔐 Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/skill-exchange.git
cd skill-exchange
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔍 How to Test the App (2 Users)

1. Register User A

2. Register User B

3. Add opposite skills in profiles

4. Check Matches

5. Send messages

6. Book sessions

7. Complete session

8. Leave review

9. See rating update

---

##  🔄Note 

The application uses request-based data updates. Some actions may require a page refresh to reflect the latest data. Real-time updates can be implemented in future versions.
