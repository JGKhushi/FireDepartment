# 🔥 SafeFlame - Fire Department Real-Time Monitoring & Automation System

> A smart, scalable, and real-time platform designed to modernize the fire safety process through automated NOC application handling, AI chatbot support, and real-time inspection monitoring.

🚀 **Live Demo:** [https://fire-system-app.vercel.app/](https://fire-system-app.vercel.app/)

---

## 🧠 Problem Statement

Traditional Fire NOC (No Objection Certificate) systems are often slow, paper-based, and lack transparency.  
**SafeFlame** offers a **fully digital**, **real-time**, and **AI-powered platform** that streamlines the entire fire safety process — from NOC applications to inspection and final approval.

---

## ⚙️ Key Features

### 👨‍🚒 **Admin Panel (Fire Department Officers)**
- 📄 Review, approve, or reject NOC applications  
- 🗓️ Schedule property inspections  
- 📍 Assign field officers  
- 📥 Issue digital NOC certificates  

### 👤 **Client Panel (User / Applicant)**
- 📝 Register & apply for Fire NOC  
- 🔄 Track application status in real-time  
- 💬 Get support via AI chatbot  
- 🆘 Access emergency contacts & fire station locator  

### 🔧 **Additional Capabilities**
- 🗺️ Google Maps-powered **Fire Station Locator**  
- 📢 **Emergency Messaging System**  
- 🤖 Integrated **AI Chatbot** for 24x7 query resolution  
- 📆 **Automated Inspection Scheduling** with calendar integration  

---

## 🌐 Tech Stack

| Layer        | Technologies Used                             |
|--------------|------------------------------------------------|
| 💻 Frontend   | React.js, Vite, Tailwind CSS                  |
| 🔙 Backend    | Node.js, Express.js                           |
| 💾 Database   | MongoDB / Firebase                            |
| 🧠 AI/ML      | chatbot & suggestions                         |
| 🗺️ Maps       | Google Maps API                               |
| 🔐 Auth       | OAuth 2.0, JWT-based Role Authentication      |
| ☁️ Hosting    | Vercel                                        |
| 🧰 Tools      | GitHub, Postman, VS Code                      |

---

## 🔁 System Workflow

1. 📝 User registers and submits a Fire NOC application  
2. 🕵️ Admin reviews the request and schedules inspection  
3. 🚒 Officer visits the location and updates status  
4. ✅ Admin issues or rejects Digital NOC Certificate  
5. 📲 User gets real-time notifications & chatbot assistance  

---

## 🎯 Unique Selling Points

- 📑 Fully Paperless Fire NOC Workflow  
- ⏱️ Real-Time Status Tracking  
- 🧠 AI Chatbot for 24x7 Smart Support  
- 📍 Fire Station Geo-Locator  
- 🗓️ Smart Inspection Scheduling System  
- 🔐 Secure Role-Based User Access  
- 🔄 Future-ready: Scalable for IoT and Predictive AI Integration  

---

## 🛠️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/JGKhushi/FireDepartment
cd FireDepartment

# Setup Frontend
cd frontend
npm install
npm run dev

# Setup Backend
cd ../backend
npm install
node index.js
