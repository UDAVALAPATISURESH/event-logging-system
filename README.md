
# **Event Logging System**

An event logging system designed to handle, store, and query logs securely using cryptographic techniques for tamper-proofing. This system is built using **Node.js**, **Express.js**, and **MongoDB**, ensuring scalability and reliability for large datasets.

---

Demo Video
For a quick overview, watch the [Demo Video.](https://drive.google.com/file/d/1yUBBTNDSBKNjtDLaMEKOvGzOPhsdqL9t/view?usp=drive_link)

---

## **Features**
1. **Event Logging API**: 
   - Store event logs with secure hash chaining to prevent tampering.
   - Validate input data for integrity.

2. **Tamper-Proof Logs**: 
   - Uses cryptographic hashing (e.g., SHA-256) for ensuring logs remain unaltered.

3. **Search and Query Logs**: 
   - Query logs by filters like timestamp range, event type, and more.

4. **Scalable Design**: 
   - MongoDB is used as the database for handling large datasets efficiently.

5. **Optional Bonuses**: 
   - Real-time log streaming with WebSockets or SSE.
   - A dashboard for visualization.
   - Semi-decentralized logging system for enhanced resilience.

---

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cryptography**: Crypto (Node.js library)
- **Real-Time Communication (Optional)**: WebSockets
- **Frontend (Optional)**: React.js (for dashboard)

---

## **Folder Structure**
```
event-logging-system/
├── server.js                 # Entry point of the application
├── routes/                   # Defines API endpoints
│   └── eventRoutes.js        # Event-related routes
├── models/                   # Database schemas
│   └── EventLog.js           # Schema for event logs
├── controllers/              # API logic
│   └── eventController.js    # Controller for event-related logic
├── config/                   # Config files
│   └── dbConfig.js           # MongoDB connection configuration
├── public/                   # Optional frontend or assets
└── README.md                 # Project documentation
```

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/event-logging-system.git
   cd event-logging-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - Update the `dbConfig.js` file in the `config/` directory with your MongoDB connection URI.

4. Start the server:
   ```bash
   node server.js
   ```

---

## **API Endpoints**

### **1. Add Event Log**
- **URL**: `/api/events`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "eventType": "user_login",
    "data": {
      "userId": "12345",
      "location": "USA"
    }
  }
  ```
- **Response**:
  ```json
  {
    "_id": "64a87f30...",
    "eventType": "user_login",
    "data": {
      "userId": "12345",
      "location": "USA"
    },
    "prevHash": "f4d5e8c4...",
    "hash": "1c79d5f0...",
    "timestamp": "2024-11-23T10:30:00.000Z"
  }
  ```

### **2. Get Event Logs**
- **URL**: `/api/events`
- **Method**: GET
- **Query Parameters**:
  - `eventType` (optional): Filter by event type.
  - `startTime` and `endTime` (optional): Filter logs by timestamp range.
- **Response**:
  ```json
  [
    {
      "_id": "64a87f30...",
      "eventType": "user_login",
      "data": {
        "userId": "12345",
        "location": "USA"
      },
      "prevHash": "f4d5e8c4...",
      "hash": "1c79d5f0...",
      "timestamp": "2024-11-23T10:30:00.000Z"
    }
  ]
  ```

---

## **Key Concepts**

1. **Hash Chaining**:
   - Each log's hash includes the hash of the previous log, making tampering evident.
   
2. **MongoDB**:
   - Provides scalability and high-performance querying for logs.

3. **Validation**:
   - Ensures logs are only accepted with valid `eventType` and `data`.

---

## **Future Enhancements**
- **Real-Time Updates**: Implement WebSocket for live log updates.
- **Dashboard**: Build a frontend interface for visualizing and querying logs.
- **Semi-Decentralized Storage**: Use distributed databases for resilience.

---

## **Contributing**
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push the branch: `git push origin feature-name`.
5. Open a pull request.


