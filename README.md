# 🌐 GlobalConnect AI

An AI-powered multilingual translation platform built using a React frontend and Flask backend, powered by Meta’s NLLB (No Language Left Behind) model.

GlobalConnect AI enables seamless real-time translation across multiple languages with a modern and interactive user interface.

---

## 🚀 Features

* 🌍 Multilingual translation using NLLB model
* ⚡ Real-time translation via REST API
* 🎯 Dynamic language selection
* 🧠 NLP-powered translation engine
* 🖥️ Full-stack architecture (React + Flask)
* 🔗 Frontend–backend integration with API communication

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* JavaScript
* HTML, CSS

**Backend**

* Python
* Flask
* Flask-CORS

**AI / NLP**

* Hugging Face Transformers
* NLLB Model
* PyTorch

---

## 📁 Project Structure

```
GlobalConnect-AI/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── models/
│       ├── __init__.py
│       └── translate_engine.py
│
├── frontend/
│   ├── public/
│   └── src/
│
└── .gitignore
```

---

## ▶️ How to Run

### 🔹 Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm start
```

---

## ⚙️ How It Works

1. User selects a target language from the frontend
2. Text input is sent to the Flask backend via API
3. Backend processes the request using the NLLB model
4. Translated text is returned and displayed in real-time

---

## 📌 Future Improvements

* 🎤 Speech-to-text and text-to-speech integration
* 🌐 Automatic language detection
* ⚡ Faster inference optimization
* ☁️ Deployment using cloud services (AWS / Render)

---

## 👨‍💻 Author

**Sambat Kumar**


---

## ⭐ Acknowledgment

This project is inspired by advancements in multilingual AI and Meta’s NLLB model.

---
