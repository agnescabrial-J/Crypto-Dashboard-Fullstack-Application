# Crypto Dashboard – Fullstack Application
==========================================
## Project Overview
=====================
This project is a Cryptocurrency Analytics Dashboard** developed as part of the **C4Scale Fullstack Take-Home Assignment.

The application displays real-time and historical cryptocurrency data using the **CoinGecko API**, which is securely wrapped through backend APIs. The dashboard includes an interactive price chart and a Top Gainers and Losers panel with a clean and modern UI.


## Features
============
### Cryptocurrency Detailed Analysis Panel
- Dropdown to select cryptocurrency (Bitcoin, Ethereum, Solana)
- Time range selection (7 Days, 14 Days, 30 Days)
- Interactive line chart showing historical price data
- Chart updates dynamically based on user selection

### Top Gainers & Losers Panel
- Displays top gainer and top loser based on 24-hour percentage change
- Shows:
  - Cryptocurrency name and symbol
  - Current price
  - 24-hour percentage change
- Color indicators:
  - Green for gainers
  - Red for losers

## Technology Stack
===================
### Frontend
- Angular (Standalone Components)
- TypeScript
- RxJS Observables
- Chart.js
- SCSS

### Backend
- Python
- Django
- Django REST Framework
- CoinGecko API
- Django Caching


## Folder Structure
========================

Crypto-Dashboard-Fullstack-Application
│
├── backend/
│   ├── crypto/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── services/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   └── manage.py
│
├── frontend/crypto-dashboard/
│   ├── src/app/
│   │   ├── components/
│   │   │   ├── market-chart/
│   │   │   └── top-movers/
│   │   ├── services/
│   │   │   └── crypto.service.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   └── angular.json
│
└── README.md

## Backend API Endpoints
=======================
### Market Chart Data
GET /api/market-chart/?coin=bitcoin&days=7
### Top Gainer
GET /api/top-gainer/
### Top Loser
GET /api/top-loser/
All backend APIs act as wrappers around CoinGecko APIs.  
Responses are cached to minimize API calls and handle rate limits efficiently.

## Setup Instructions
======================
### Backend Setup (Django)
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at: http://127.0.0.1:8000

### Frontend Setup (Angular)
===========================
cd frontend/crypto-dashboard
npm install
ng serve

Frontend runs at: http://localhost:4200

