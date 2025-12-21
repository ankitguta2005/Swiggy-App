
# Swiggy App – Full-Stack MERN Food Ordering Application

This project is a full-stack food ordering web application inspired by Swiggy, built using the MERN stack.
The goal of this project was to understand how a real-world food delivery platform works end-to-end, from browsing food items and managing a cart to completing a secure online payment.

The application focuses on clean architecture, realistic features, and secure payment handling, while avoiding shortcuts such as unsafe API usage or unreliable data scraping.

---

##Live Demo

###Frontend (Vercel):
👉 https://swiggy-five-ashen.vercel.app

The application is deployed on Vercel. Payments are integrated using Razorpay Test Mode, so no real money is deducted.

---

## Features

* User authentication (login required before placing an order)
* Restaurant and food listing (static data for one location)
* Cart management

  * Add items
  * Remove items
  * Clear cart
* Food filtering for improved user experience

  * Top-rated foods
  * Price-based filtering
  * Veg / Non-veg (where available)
  * Search by food name
* Razorpay payment gateway integration (Test Mode)
* Secure backend payment verification using cryptographic signatures
* Order placed successfully confirmation page
* Fast and responsive user interface
* Secure use of environment variables
* Clear separation of frontend and backend

---

## Technology Stack

### Frontend

* React (Vite)
* Redux Toolkit
* React Router
* Tailwind CSS
* Razorpay Checkout
* React Hot Toast

### Backend

* Node.js
* Express.js
* Razorpay Node SDK
* Crypto (HMAC SHA-256 verification)
* dotenv
* CORS

---

## Data Limitation

Due to Swiggy API restrictions, the application currently uses static data for a single predefined location.
Dynamic multi-location data access is restricted, as Swiggy does not provide an official public API.

The application architecture supports scalability and can be extended using a database or official APIs in the future.

---

## Payment Gateway

Payments are integrated using Razorpay in test mode.
No real money is deducted during testing, and the payment flow closely mirrors a production setup.

### Test Card Details

```
Card Number: 4111 1111 1111 1111
Expiry Date: Any future date
CVV: Any 3 digits
OTP: 123456
```

### Test UPI

```
success@razorpay
OTP: 123456
```

---

## Project Structure

```
swiggy-project/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   └── payment.js
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## Environment Variables

### Frontend

```env
VITE_RAZORPAY_KEY=rzp_test_xxxxx
VITE_API_URL=http://localhost:5000
```

### Backend

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxxxxx
```

Environment files are excluded from version control for security reasons.

---

## Running the Project Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

---

## Learning Outcomes

* Real-world payment gateway integration
* Secure backend payment verification
* Frontend and backend separation in MERN applications
* Environment-based configuration management
* State management and filtering logic implementation
* Deployment-ready project structuring

---

## Future Enhancements

* Order history
* MongoDB integration
* Cash on Delivery option
* Admin dashboard
* Multi-location food data
* Live Razorpay payment integration

---

## Developer

**Ankit Gupta**
Aspiring Full-Stack MERN Developer


