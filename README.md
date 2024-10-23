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

1. Register User: Screenshots/register.png
2. Login User: Screenshots/login.png
3. Add Transactions: Screenshots/transactions.png
4. 
5. Add Transaction: 


6. Get Transactions: 

