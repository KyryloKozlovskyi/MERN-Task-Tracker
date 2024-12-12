# MERN Task Tracker
Welcome to the User Guide for the MERN Task Tracker. This guide describes the web app's features and provides instructions on how to use it.

# Installation
1. Clone the Repository:
```
git clone https://github.com/KyryloKozlovskyi/MERN-Task-Tracker.git
```
2. Navigate to the project directory:
```
cd MERN-Task-Tracker
```
3. Install npm packages:
```
npm install
```
4. Install the following Dependencies:

    **Core Dependencies**
    * axios - ^1.7.8
    * react - ^18.3.1
    * react-dom - ^18.3.1
    * react-router-dom - ^7.0.1
    * react-scripts - 5.0.1

    **Frontend**
    * bootstrap - ^5.3.3
    * react-bootstrap - ^2.10.6
    * react-switch - ^7.0.0

    **Backend**
    * express - ^4.21.1
    * mongoose - ^8.8.3
    * cors - ^2.8.5
    * body-parser - ^1.20.3
    * dotenv - ^16.4.7
    * multer - ^1.4.5-lts.1

    **Utilities**
    * buffer - ^6.0.3
    * web-vitals - ^2.1.4


5. Configure Environment Variables:
    * Create a .env file in the project root and Replace "LINK" with your database connection URI.
```
MONGO_URL="LINK"
SERVER_PORT=4000
```

6. Start the backend server:
```
cd backend
nodemon server.js
```
7. Start the app:
```
npm start
```

8. Access the App: 
    * Open your browser and navigate to http://localhost:3000
