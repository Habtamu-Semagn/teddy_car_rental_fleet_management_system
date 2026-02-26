# Teddy Car Rental Fleet Management System

A full-stack car rental fleet management application with React frontend, Express.js backend, PostgreSQL database, and Prisma ORM.

## Features

- **User Roles**: Admin, Employee, Customer
- **Car Management**: Add, update, delete, and manage fleet vehicles
- **Booking System**: Create, process, and track car rentals
- **Package Management**: Rental packages with different pricing tiers
- **Payment Processing**: Integrated payment tracking
- **Document Management**: Upload and manage driver licenses, ID cards
- **Reporting**: Generate reports for fleet performance
- **Map Integration**: Location-based services with Leaflet
- **Modern UI**: Beautiful interface with dark/light mode support

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download for Windows](https://nodejs.org/) | [Download for macOS/Linux](https://nodejs.org/)
- **npm** (included with Node.js)
- **PostgreSQL** (v14 or higher) - [Download for Windows](https://www.postgresql.org/download/windows/) | [Download for macOS](https://www.postgresql.org/download/macos/) | [Linux (Ubuntu)](https://www.postgresql.org/download/linux/ubuntu/)
- **Git** - [Download for Windows](https://git-scm.com/download/win) | [Download for macOS](https://git-scm.com/download/mac)

### Windows-Specific Setup

1. **Install Node.js**: Download the LTS version from [nodejs.org](https://nodejs.org/) and run the installer. Select "Add to PATH" during installation.

2. **Install PostgreSQL**: 
   - Download PostgreSQL from the official website or use [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
   - During installation, set a password for the postgres user
   - Keep the default port (5432)
   - Complete the installation

3. **Install Git**: Download from [git-scm.com](https://git-scm.com/download/win)
   - Recommended: Use Git Bash or VSCode's integrated terminal for running commands

> **Tip**: On Windows, you can use PowerShell, Command Prompt, or Git Bash. The commands below use Unix-style syntax. If using Command Prompt, replace `cp` with `copy`. Git Bash and PowerShell support Unix-style commands.

## Project Structure

```
teddy_car_rental_fleet_management_system/
├── backend/                 # Express.js API server
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── middlewares/    # Express middlewares
│   │   ├── utils/          # Utility functions
│   │   └── services/       # Business logic
│   ├── uploads/            # Uploaded files storage
│   └── server.js           # Entry point
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React contexts
│   │   └── api.js         # API client
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Installation Guide

### 1. Clone the Repository

```bash
# Using Git Bash / macOS Terminal / Linux Terminal
git clone <repository-url>
cd teddy_car_rental_fleet_management_system

# Using Windows Command Prompt
git clone <repository-url>
cd teddy_car_rental_fleet_management_system
```

### 2. Backend Setup

#### Install Backend Dependencies

```bash
# Using any terminal
cd backend
npm install
```

#### Configure Environment Variables

The project includes a `.env.example` file. Copy it and configure it with your PostgreSQL credentials:

```bash
# Using Git Bash / macOS Terminal / Linux Terminal
cp .env.example .env

# Using Windows Command Prompt
copy .env.example .env

# Using Windows PowerShell
Copy-Item .env.example .env
```

Edit the `.env` file and update the `DATABASE_URL` with your PostgreSQL connection string:

```env
# For local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/teddy_car_rental?schema=public"

# For Windows local PostgreSQL (alternative format)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/teddy_car_rental?schema=public"
```

> **Note on Windows**: If you installed PostgreSQL using the installer, the default user is `postgres`. Replace `username` with `postgres` and `password` with the password you set during installation.

#### Set Up PostgreSQL Database

**On Windows:**

1. Open pgAdmin (included with PostgreSQL) or use Command Prompt:
   ```cmd
   cd "C:\Program Files\PostgreSQL\<version>\bin"
   psql -U postgres
   ```

2. Create the database:
   ```sql
   CREATE DATABASE teddy_car_rental;
   ```

3. Exit psql:
   ```bash
   \q
   ```

**On macOS:**
```bash
psql -U postgres
CREATE DATABASE teddy_car_rental;
\q
```

**On Linux (Ubuntu):**
```bash
sudo -u postgres psql
CREATE DATABASE teddy_car_rental;
\q
```

#### Automatic Setup (Recommended)

Run the automatic setup script that will migrate the database and seed it with sample data:

```bash
cd backend
node setup.js
```

This will:
- ✅ Run database migrations
- ✅ Seed sample data (users, cars, packages, bookings)

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

---

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Login Credentials

The database is automatically seeded with sample data. Use these accounts to log in:

### Admin Account
- **Email**: admin@teddyrental.com
- **Password**: Password123!

### Employee Account
- **Email**: employee@teddyrental.com
- **Password**: Password123!

### Customer Account (Register New)
- Use the registration form on the frontend

**Note**: You can also register new customer accounts directly from the application's registration page.

## Sample Data Included

When you run `node setup.js`, the database is automatically seeded with:

### Users (3 accounts)
- 1 Admin account
- 1 Employee account
- 1 Customer account

### Cars (12 vehicles)
- 2 Toyota vehicles (Corolla, Land Cruiser)
- Hyundai Accent and Tucson
- Suzuki Swift
- Toyota Rav4
- Mercedes C-Class
- Ford Explorer
- Kia Cerato
- Audi A6
- Mitsubishi Pajero
- Toyota HiAce (Van)

All cars are set to `AVAILABLE` status with various categories (Economy, SUV, Luxury, Van).

### Rental Packages (8 packages)
- Basic, Standard, Premium Daily packages
- Weekly Economy and Standard packages
- Monthly Economy, Standard, and Premium packages

### Sample Booking
- One pending booking for the customer account

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package
- `PUT /api/packages/:id` - Update package

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID

### Reports
- `GET /api/reports/revenue` - Revenue report
- `GET /api/reports/occupancy` - Occupancy report

### Upload
- `POST /api/upload` - Upload files (documents/images)

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Security**: Helmet, CORS

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Maps**: Leaflet + React Leaflet
- **Date Handling**: date-fns
- **HTTP Client**: Fetch API

## Troubleshooting

### Database Connection Issues

If you get a database connection error:

1. **On Windows**: Make sure PostgreSQL service is running:
   ```cmd
   # Open Services and find "postgresql-x64-<version>"
   # Or using Command Prompt as Administrator:
   net start postgresql-x64-<version>
   ```
   
   Alternatively, open pgAdmin and verify the server is running.

2. **On macOS**:
   ```bash
   brew services start postgresql
   ```

3. **On Linux**:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start postgresql
   
   # Or
   sudo service postgresql start
   ```

4. Verify your `.env` DATABASE_URL is correct

5. Run migrations again:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

### Port Already in Use

If ports 5000 or 5173 are already in use:

- **Windows**: Check what's using the port:
  ```cmd
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
- Backend: Change `PORT` in `backend/.env`
- Frontend: Modify `port` in `frontend/vite.config.js`

### Node Module Issues

If you encounter module errors:

```bash
# Using Git Bash / macOS Terminal / Linux Terminal
rm -rf backend/node_modules frontend/node_modules
cd backend && npm install
cd ../frontend && npm install

# Using Windows Command Prompt
rd /s /q backend\node_modules
rd /s /q frontend\node_modules
cd backend
npm install
cd ..\frontend
npm install

# Using Windows PowerShell
Remove-Item -Recurse -Force backend\node_modules
Remove-Item -Recurse -Force frontend\node_modules
cd backend
npm install
cd ..\frontend
npm install
```

### Windows-Specific Issues

#### Issue: npm install fails with EACCES errors

**Solution**: Run Command Prompt or PowerShell as Administrator, or fix npm permissions:
```cmd
npm config set prefix "$APPDATA\npm"
```

#### Issue: Cannot find PostgreSQL

**Solution**: Add PostgreSQL bin directory to PATH:
1. Search for "Environment Variables" in Windows
2. Edit System Properties > Environment Variables
3. Add to PATH: `C:\Program Files\PostgreSQL\<version>\bin`

#### Issue: Long path names on Windows

**Solution**: Enable long path support:
```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\FileSystem" /v LongPathsEnabled /t REG_DWORD /d 1 /f
```

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start development server (with nodemon)
npm start       # Start production server
npx prisma studio   # Open Prisma database GUI
```

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## License

This project is for educational and demonstration purposes.
