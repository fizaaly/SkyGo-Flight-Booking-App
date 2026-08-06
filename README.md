# ✈️ SkyGo — Flight Booking App

SkyGo is a full-stack travel booking web application that allows users to search and book flights, hotels, and cabs — with a complete payment flow, e-ticket generation, and an admin dashboard for managing the platform.

---

## 🚀 Features

- **Flight Search** — Search and filter flights by route, date, and cabin class
- **Hotel Booking** — Browse hotels with category filters, ratings, and wishlist
- **Cab Booking** — Airport transfers and city rides with live fare estimation
- **Offers & Coupons** — Flash deals with countdown timer and coupon copy feature
- **User Authentication** — Signup and login with JWT-based backend auth
- **3-Step Booking Wizard** — Traveller details → Seat selection → Payment
- **Payment Page** — Supports Card, UPI, Net Banking, and Wallet with live card preview
- **E-Ticket** — Animated confirmation with barcode, download, and share
- **My Trips** — View, filter, and cancel bookings
- **Admin Dashboard** — Login-protected panel to manage users, flights, hotels, bookings, and offers

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | JSON File (db.json) — no installation required |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| Styling | Custom CSS, Glassmorphism, CSS Animations |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Poppins |

---

## 📁 Project Structure

```
SkyGo/
├── index.html              # Homepage with hero slider & search
├── flights.html            # Flight search & results
├── hotels.html             # Hotel listings & booking
├── cabs.html               # Cab types & booking
├── offers.html             # Deals & coupon codes
├── booking.html            # 3-step booking wizard
├── payment.html            # Payment gateway UI
├── ticket.html             # E-ticket confirmation
├── mytrips.html            # User bookings dashboard
├── login.html              # User login
├── signup.html             # User registration
├── admin.html              # Admin dashboard (protected)
├── css/                    # Stylesheet for each page
├── js/                     # JavaScript for each page
├── images/                 # All images and assets
└── backend/
    ├── server.js           # Express server entry point
    ├── db.json             # JSON-based database
    ├── routes/             # API route handlers
    │   ├── auth.js         # Login, register, JWT
    │   ├── flights.js      # Flight CRUD & search
    │   ├── hotels.js       # Hotel CRUD & search
    │   ├── cabs.js         # Cab types & fare estimate
    │   ├── bookings.js     # Create & manage bookings
    │   └── offers.js       # Offers & coupon validation
    └── middleware/
        ├── auth.js         # JWT verification
        └── errorHandler.js # Global error handler
```

---

## ⚙️ Getting Started

### Run Frontend Only
Open `index.html` directly in your browser — no setup required.

### Run with Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
node server.js
```

Then open: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |
| GET | `/api/auth/me` | Get logged-in user | JWT |
| GET | `/api/flights` | List / search flights | Public |
| GET | `/api/hotels` | List / search hotels | Public |
| GET | `/api/cabs` | List cab types | Public |
| POST | `/api/cabs/estimate` | Get fare estimate | Public |
| GET | `/api/offers` | List active offers | Public |
| POST | `/api/offers/validate` | Validate coupon code | Public |
| POST | `/api/bookings` | Create a booking | JWT |
| GET | `/api/bookings/my` | Get user's bookings | JWT |
| PUT | `/api/bookings/:id/cancel` | Cancel a booking | JWT |

---

## 🔐 Authentication

- Users can register via `/signup.html` or the API
- Login returns a JWT token stored in `localStorage`
- Admin dashboard at `/admin.html` requires an admin account to access
- All booking-related APIs are protected with JWT middleware

---

## 🖥️ Admin Dashboard

The admin panel is accessible at `http://localhost:5000/admin.html`.

It requires admin credentials to log in and provides:
- Overview stats (flights, hotels, cabs, users)
- Full data tables for all collections
- Live API status check
- Booking management

---

## 📸 Screenshots

> Homepage, Flights, Hotels, Booking, Payment, Ticket, Admin Dashboard

---

## 👩‍💻 Author

**Fiza** — Built with passion using HTML, CSS, JavaScript & Node.js
