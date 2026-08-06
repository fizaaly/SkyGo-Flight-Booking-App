# ✈️ SkyGo — Flight Booking App

SkyGo is a full-stack travel booking web app where users can search flights, book hotels and cabs, make payments, and get e-tickets — all in one place.

---

## 🚀 Features

- **Flight Search** — Search and filter flights by route, date and cabin class
- **Hotel Booking** — Browse and book hotels with filters and wishlist
- **Cab Booking** — Airport transfers and city rides with fare estimate
- **Offers & Coupons** — Live countdown deals with copy coupon feature
- **User Auth** — Signup, Login with localStorage + backend JWT support
- **Booking Flow** — 3-step wizard: Traveller details → Seat selection → Payment
- **Payment Page** — Card, UPI, Net Banking, Wallet tabs with live card preview
- **E-Ticket** — Confetti animation, barcode, download & share
- **My Trips** — View, filter and cancel bookings
- **Admin Dashboard** — Login protected panel to view users, flights, hotels, bookings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | JSON File (db.json) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Styling | Custom CSS, Glassmorphism, Animations |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts (Poppins) |

---

## 📁 Project Structure

```
SkyGo/
├── index.html          # Homepage
├── flights.html        # Flight search
├── hotels.html         # Hotel listing
├── cabs.html           # Cab booking
├── offers.html         # Deals & coupons
├── booking.html        # Booking wizard
├── payment.html        # Payment page
├── ticket.html         # E-ticket
├── mytrips.html        # My bookings
├── login.html          # Login
├── signup.html         # Signup
├── admin.html          # Admin dashboard
├── css/                # All CSS files
├── js/                 # All JS files
├── images/             # All images
└── backend/
    ├── server.js       # Express server
    ├── db.json         # JSON database
    ├── routes/         # API routes
    └── middleware/     # Auth & error handlers
```

---

## ⚙️ How to Run

### Frontend only
Just open `index.html` in your browser — no setup needed.

### With Backend
```bash
cd backend
npm install
node server.js
```
Then open: `http://localhost:5000`

---

## 🔐 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@skygo.com | admin123 |
| User | fiza@skygo.com | fiza123 |
| Demo | demo@skygo.com | demo123 |

Admin Dashboard: `http://localhost:5000/admin.html`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login user |
| POST | /api/auth/register | Register user |
| GET | /api/flights | List flights |
| GET | /api/hotels | List hotels |
| GET | /api/cabs | List cab types |
| GET | /api/offers | List offers |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/my | My trips |

---

## 🙋‍♀️ Made by Fiza
