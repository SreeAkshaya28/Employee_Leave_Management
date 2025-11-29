# Employee Leave Management System

A full‑stack leave management system with two roles:

- **Employee** – apply for leaves, view/cancel requests, see leave balance. [attached_file:5]  
- **Manager** – review pending requests, approve/reject, view team history and stats. [attached_file:5]

---

## Tech Stack

- **Frontend:** React (Context + React Router)  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  
- **Auth:** JWT-based login (employee / manager)

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/employee-leave-management.git
cd employee-leave-management

text

### 2. Backend setup

cd backend
npm install
cp .env.example .env # then edit .env with your values
npm run dev

text

Backend runs on `http://localhost:5000` by default. [attached_file:5]

### 3. Frontend setup

cd ../frontend/employee-leave-frontend
npm install
npm start

text

Frontend runs on `http://localhost:3000`. [attached_file:5]

---

## How to Run the Application

1. Start PostgreSQL locally and create a database, e.g. `employee_leave_db`.  
2. Ensure `.env` in `/backend` is correctly filled (see next section).  
3. In one terminal, run the **backend**:

cd backend
npm run dev

text

4. In another terminal, run the **frontend**:

cd frontend/employee-leave-frontend
npm start

text

5. Open `http://localhost:3000` in the browser.

6. From the **Register** page, create: [attached_file:5]  
- an **Employee** user (role = employee)  
- a **Manager** user (role = manager)

7. Login and use the app:

- **Employee:** Dashboard, Apply Leave, My Requests, Profile. [attached_file:5]  
- **Manager:** Dashboard, Pending Requests, All Requests. [attached_file:5]

---

## Environment Variables

Create a `.env` file inside the **backend** folder based on `.env.example`. [attached_file:5]

PORT=5000

PostgreSQL connection
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_db_user
PG_PASSWORD=your_db_password
PG_DATABASE=employee_leave_db

JWT configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d

text

Notes:

- The API base URL used by the frontend is `http://localhost:5000/api` (configured in `frontend/src/api.js`).  
- Change these values only if you host backend on a different port or server.

---

## Main Features

### Employee

- Register / Login. [attached_file:5]  
- Apply for leave (Sick, Casual, Vacation).  
- View own leave requests with status.  
- View leave balance (Sick: 10, Casual: 5, Vacation: 5).  
- Cancel pending requests.  
- Dashboard with personal stats (total / pending / approved). [attached_file:5]

### Manager

- Login as manager.  
- View all pending leave requests and approve / reject.  
- View all employees’ leave history.  
- Dashboard with team stats (total / pending / approved). [attached_file:5]

---

## API Endpoints (Summary)

From the assignment document: [attached_file:5]

- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET  /api/auth/me`

- **Leaves – Employee**
  - `POST   /api/leaves` – Apply leave  
  - `GET    /api/leaves/my-requests` – My requests  
  - `DELETE /api/leaves/:id` – Cancel pending request  
  - `GET    /api/leaves/balance` – My leave balance  

- **Leaves – Manager**
  - `GET /api/leaves/all` – All requests  
  - `GET /api/leaves/pending` – Pending only  
  - `PUT /api/leaves/:id/approve` – Approve  
  - `PUT /api/leaves/:id/reject` – Reject  

- **Dashboard**
  - `GET /api/dashboard/employee` – Employee stats  
  - `GET /api/dashboard/manager` – Manager stats  

---

