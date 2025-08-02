# ⛰️ Milesto (MVP): AI-Powered Goal Tracking  

Milesto is a **React web application** (with a Flask backend) that helps users **set goals, break them into steps, and provide proof for each completed step**.  
This **Minimum Viable Product (MVP)** demonstrates how **AI can guide users through structured goal tracking** and keep them accountable.  

---

## ✨ Current Features (MVP)  

### 🎯 Goal Creation  
- Users can **enter a goal** (e.g., *Pass a Data Analyst interview*).  
- Milesto uses **AI** to generate a list of **step-by-step tasks** to achieve the goal.  

### 📊 Step Tracking  
- Each step can only be marked complete by **submitting proof**.  
- Proof can be a **text explanation** or a **file upload** (e.g., image, certificate).  
- Progress updates dynamically as proof is provided.  

### 🤖 AI Assistance  
- **AI-generated step breakdowns** when a new goal is created.  
- **AI validation of proof** with feedback shown in the UI.  

---

## ⚙️ Tech Stack  

- **Frontend**: React  
- **Backend**: Flask (Python)  
- **Authentication & Storage**: Firebase  
- **AI Integration**: OpenAI GPT  
- **File Handling**: Firebase Storage  

---

## 📌 Getting Started  

### Prerequisites  
- Node.js and npm  
- Python 3.x  
- Firebase project  
- OpenAI API key  

### Setup  



### bash 
cd frontend
npm install
Install backend dependencies


cd backend
pip install -r requirements.txt
Add environment variables

frontend/.env

REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_BACKEND_URL=http://localhost:5000
backend/.env

OPENAI_API_KEY=your_openai_key
FIREBASE_CREDENTIALS=path_to_your_firebase_service_account.json
Run the app


# Start Flask backend
cd backend
python openAIserver.py

# Start React frontend
cd frontend
npm start
