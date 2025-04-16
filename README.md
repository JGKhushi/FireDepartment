# 🔥 SafeFlame - Fire Department Real-Time Monitoring & Automation System

A smart, scalable, and real-time platform designed to modernize the fire safety process through automated NOC application handling, AI chatbot assistance, and real-time inspection monitoring.

---

## 📌 Problem Statement

Traditional fire NOC (No Objection Certificate) systems are slow, paper-based, and inefficient. SafeFlame provides a **fully digital, transparent, and real-time platform** to streamline the entire fire safety workflow — from NOC application to inspection and approval.

---

## 🧠 Key Features

✅ **Admin Panel (Fire Department Officers)**  
- Review, approve or reject NOC applications  
- Schedule property inspections  
- Assign on-site officers  
- Issue digital NOC certificates  

✅ **Client Panel (User/Applicant)**  
- Register & apply for NOC  
- Track application status in real-time  
- Use AI Chatbot for instant queries  
- Contact nearest fire stations and emergency services  

✅ **Additional Capabilities**  
- 🔍 **Fire Station Locator** via Google Maps  
- 📢 **Emergency Messaging**  
- 🤖 **AI Chatbot Assistance**  
- 📆 **Automated Inspection Scheduling**

---

## 🌐 Tech Stack

| Layer         | Tech Used                                  |
|--------------|---------------------------------------------|
| 🔹 Frontend   | React.js, Vite, CSS                         |
| 🔹 Backend    | Node.js, Express.js                         |
| 🔹 Database   | MongoDB / Firebase                          |
| 🔹 AI         | SOLO (AI/ML module)                         |
| 🔹 APIs       | Google Maps API                             |
| 🔹 Auth       | OAuth 2.0, JWT                              |
| 🔹 Hosting    | Vercel / Netlify                            |
| 🔹 Tools      | GitHub, VS Code                             |

---

## 📊 System Flow

1. **User** registers and submits a Fire NOC application  
2. **Admin** reviews the application and schedules inspection  
3. **Fire Officer** visits the location and updates the status  
4. **Admin** approves/rejects and issues a **Digital NOC Certificate**  
5. User gets **real-time notifications** and **chat support**

---

## 🧩 Uniqueness & Innovation

- 📄 **Fully Paperless Workflow**
- ⏱️ **Real-Time Application Tracking**
- 🤖 **AI-Powered Chatbot**
- 🗺️ **Fire Station Locator**
- 📆 **Automated Scheduling**
- 🔐 **Secure, Role-Based Access**
- 📈 **Scalable for IoT & Advanced AI Integration**

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/JGKhushi/FireDepartment

# Navigate into the frontend
cd frontend
npm install
npm run dev

# Navigate into the backend
cd backend
npm install
node index.js
