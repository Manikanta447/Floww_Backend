This is a Node.js backend project that allows users to track their personal income and expenses. It uses Express.js as the web framework and SQLite as the database. The API provides functionality to manage transactions and users, with basic authentication.
Features:
1. User authentication (register/login).
2. Add, view, update, and delete transactions (income and expenses).
3. Pagination support for transaction retrieval.
4. Summary reports of total income, expenses, and balance.

Setup and Installation

Follow these instructions to run the project on your local machine.
Prerequisites
Node.js installed (version 14.x or higher)
SQLite (comes included with Node.js via sqlite3 package)

Steps
1. Clone the repository:
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Install dependencies:
npm install
3. Set up the SQLite database:
Create an SQLite database (flow.db) in the project folder if it doesn't exist.
The database schema will be created automatically when you start the server if you use the provided SQL migration script.
4. Run the server:
npm start
5. The API will be available at http://localhost:3000.
   
Environment Variables
Create a .env file at the root of your project with the following variables:
PORT=3000
JWT_SECRET=secret

API Endpoints

1. Authentication
POST /register
Registers a new user.

Request Body:
{
    "username": "manikanta2",
    "password": "manikanta20212"
}

Response:
{
  "message": "User registered successfully"
}

POST /login
Logs in a user and returns a JWT token.

Request Body:
{
    "username": "manikanta2",
    "password": "manikanta20212"
}

Response:
{
  "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ
}

2. Transactions
POST /transactions
Adds a new transaction.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Request Body:
{
    "userId": "2",
    "type": "income",
    "category": "Salary",
    "amount": 50000,
    "date": "2022-02-01",
    "description": "Salary Credited"
}

Response:
{
  "message": "Transaction added successfully"
}

3. GET /transactions
Retrieves all transactions with pagination support.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Query Parameters:
page: Page number (default: 1)
limit: Number of records per page (default: 10)

Response:

{
  "transactions": [
  {
      "id": 1,
      "type": "income",
      "category": "Salary",
      "amount": 5000,
      "date": "2024-10-01",
      "description": "Monthly Salary"
    },
    {
      "id": 2,
      "type": "expense",
      "category": "Rent",
      "amount": 1200,
      "date": "2024-10-02",
      "description": "House Rent"
    }
  ],
  "page": 1,
  "totalPages": 2
}


3. GET /transactions/5
Retrieves a specific transaction by its ID.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Response:
{
  "id": 5,
  "user_id": 2,
  "type": "expense",
  "category": "groceries",
  "amount": 100,
  "date": "2022-02-02",
  "description": "baked salmon with veggie"
}


4. PUT /transactions/5
Updates an existing transaction.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Request Body:
{
    "type": "expense",
    "category": "groceries",
    "amount": 100,
    "date": "2022-02-02",
    "description": "Updated baked salmon with veggie"
}

Response:
{
  "message": "Transaction updated successfully"
}


5. DELETE /transactions/5
Deletes a specific transaction by its ID.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Response:
{
  "message": "Transaction deleted successfully"
}

Summary

6. GET /summary
Retrieves a summary of total income, expenses, and balance.

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5Njc4NzIwfQ.9xeyDtYaeLFfC57_aZiauLhNKsfkCal0sN_1AN9ztrQ

Response:
{
  "Total_Income": 50000,
  "Total_Expense": 100,
  "Balance": 49900
}

Postman Collection

Screenshots of the Postman API tests are provided in the /screenshots directory:

1. Register User: 
2. Login User: [Screenshots/login.png](https://github.com/Manikanta447/Floww_Backend/blob/c7ae83150c93194f95f12fae2dabb782a24f33bd/Screenshots/login.png)
3. Add Transactions: [Screenshots/Add_Transaction.png](https://github.com/Manikanta447/Floww_Backend/blob/0cf171fdd1a7162ac8513a3e56cdddf5f2692675/Screenshots/Add_Transaction.png)
4. Get Transactions: [Screenshots/register.png](https://github.com/Manikanta447/Floww_Backend/blob/3b997f0bc2efd078a028d7f44c3b031b75928fe0/Screenshots/transactions.png)
5. Update Transaction: [Screenshots/updated_transaction.png](https://github.com/Manikanta447/Floww_Backend/blob/17c4f282cef303581caf748c18042bd31dd067a4/Screenshots/updated_transaction.png)
6. Delete Transactions: [Screenshots/delete_transaction.png](https://github.com/Manikanta447/Floww_Backend/blob/3ff7314cd22ab5eb8e7d95e45a5cf34de3a2f6e5/Screenshots/delete_transaction.png)
7. Summary: [Screenshots/summary.png](https://github.com/Manikanta447/Floww_Backend/blob/75e8ff8a6c8addf66ad091f88cd1d1af780ce65c/Screenshots/summary.png)

