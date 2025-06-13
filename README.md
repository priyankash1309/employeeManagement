# Employee Management System (CRUD)

A full-stack Employee Management System using:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + SQLite (local database)

Supports basic **Create, Read, Update, Delete (CRUD)** operations with form validation and toast notifications.

---

## Setup Instructions

### 1. Extract the ZIP

cd employee-management

### 2. Install Node.js dependencies

Backend : 

cd backend
npm install

Frontend :

cd frontend
npm install

### 3. How to Run the Project

Backend :

cd backend
npm run dev

Frontend :

cd frontend
npm run dev

## API Documentation

### GET /employees

Response :
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "HR",
    "salary": 50000
  }
]

### POST /employees

Request Body :
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Sales",
  "salary": 45000
}

Response :
{ "message": "Employee added" }

### PUT /employees/:id

Request Body :
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Sales",
  "salary": 45000
}

Example : PUT /employees/2

Response :
{ "message": "Employee updated" }

### DELETE /employees/:id

Example : /employees/2

Response :
{ "message": "Employee deleted" }
