# Futsal Booking System

A web application for managing futsal court bookings, featuring a Django backend and React frontend.

<!-- ![System Architecture](https://via.placeholder.com/800x400.png?text=Django+React+Full-Stack) -->

## Features
- User registration and authentication
- Court availability checking
- Real-time booking system
- Booking history tracking
- Admin dashboard for court management
- Responsive React frontend

## Prerequisites
- Python 3.9+
- Node.js 16+
- npm 8+
- PostgreSQL (recommended) or SQLite

## Installation

### Backend Setup (Django)
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/futsalbookingsystem.git
   cd futsalbookingsystem/backend

2. Create and activate virtual environment

    ```bash
    python -m venv venv
    # Linux/MacOS
    source venv/bin/activate
    # Windows
    venv\Scripts\activate
    ``` 
3. Install Python dependencies
    ```bash
    pip install -r requirements.txt
    ```

4. Configure environment variables

    Create .env file in /backend:
env
    ```bash
    user = database-user-name
    password = database-password
    host = database-host
    port = 6543
    dbname = postgres

    django_security_key = your_secret_django_key

    SUPABASE_URL = supabase_url
    SUPABASE_KEY = supabase_api_key
    ```
## Running the Application 🚀

### Backend Setup (Django)

1. Apply database migrations:
    ```bash
    python manage.py migrate
    ```

### Frontend Setup (React)

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install Node.js dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start Backend Server:
    ```bash
    cd backend
    python manage.py runserver
    ```
    The Django API will be available at: [http://localhost:8000](http://localhost:8000)

2. Start Frontend Development Server:
    ```bash
    cd frontend
    npm start
    ```
    The React application will open in your browser at: [http://localhost:3000](http://localhost:3000)

---

## License 📄

MIT License

Futsal Booking System © 2024 - Developed with ❤️ by PitchReserveTeam

---

## Notes

Ensure you have proper [.env](http://_vscodecontentref_/2) files in both backend and frontend directories before starting the application. The system requires simultaneous operation of both backend and frontend servers for full functionality.

---

### Key features to note:

1. Complete separation of frontend/backend environments
2. Detailed environment variable setup
3. CORS configuration for local development
4. Clear path instructions for both OS environments
5. Production deployment considerations