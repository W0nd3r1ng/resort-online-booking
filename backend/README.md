# Villa Ester Resort Backend (Node.js + Express + MySQL)

## Prerequisites
- Node.js (v14+ recommended)
- MySQL Server

## Setup

### 1. Clone the repository and navigate to the backend folder

### 2. Install dependencies
```
npm install
```

### 3. Create a `.env` file in the backend folder with the following content:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=resort_booking
PORT=3001
```

### 4. Create the MySQL database and tables

Connect to your MySQL server and run:
```sql
CREATE DATABASE IF NOT EXISTS resort_booking;
USE resort_booking;

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  groupSize INT NOT NULL,
  date DATE NOT NULL,
  occasion VARCHAR(100),
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(100) NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Availability table (optional/mock)
CREATE TABLE IF NOT EXISTS availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  roomType VARCHAR(50) NOT NULL,
  available INT NOT NULL
);

-- Seasonal trends table (optional)
CREATE TABLE IF NOT EXISTS seasonal_trends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month INT NOT NULL,
  bookings_count INT DEFAULT 0
);
```

### 5. Start the backend server
```
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### POST `/api/book`
- **Body:** `{ name, groupSize, date, occasion, preferences[] }`
- **Action:** Creates a booking

### POST `/api/review`
- **Body:** `{ customerName, rating, comment, date }`
- **Action:** Creates a review

### POST `/api/recommend`
- **Body:** `{ date, groupSize, occasion, preferences[] }`
- **Action:** Returns a recommendation and season flag

## Notes
- All responses are in JSON.
- Errors are logged to the console for debugging.

## Frontend Integration
- Connect your booking and review forms to the above endpoints using `fetch` or `axios`.
- Display recommendation results to users after booking or on demand.

--- 