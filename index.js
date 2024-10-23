const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
let db = null
const dbPath = path.join(__dirname, 'flow.db')

// Connect to the SQLite database
const initializeDbAndServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

initializeDbAndServer()

const authenticateToken = (request, response, next) => {
    const token = request.headers.authorization
    if (!token || !token.startsWith('Bearer ')){
        response.status(401).send({message: 'Invalid token'})
        return
    }
    const jwtToken = token.split(" ")[1]
    jwt.verify(jwtToken, 'secret', (error, user) => {
        if (error) {
            response.status(403).send({message: 'Invalid token'})
            return
        }
        console.log(user)
        request.user = user.id
        next()
    })
}


app.post('/register', async (request, response) => {
    const {username, password} = request.body
    if (!username ||!password){
        response.status(400).send({message: 'Missing required fields'})
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const userCheck = `
        SELECT * FROM user WHERE username = ?
    `
    const result = await db.get(userCheck, [username])
    if (result){
        response.status(400).send({message: 'Username already exists'})
        return
    }
    const insertUser = `
        INSERT INTO user (username, password)
        VALUES (?,?)
    `
    const result2 = await db.run(insertUser, [username, hashedPassword])
    response.status(201).send({message: 'User registered successfully'})
})


app.post('/login', async (request, response) => {
    const {username, password} = request.body
    if (!username ||!password){
        response.status(400).send({message: 'Missing required fields'})
        return
    }
    const userCheck = `
        SELECT * FROM user WHERE username =?
    `
    const result = await db.get(userCheck, [username])
    if (!result){
        response.status(401).send({message: 'Invalid credentials'})
        return
    }
    const isPasswordMatch = await bcrypt.compare(password, result.password)
    if (!isPasswordMatch){
        response.status(401).send({message: 'Invalid credentials'})
        return
    }
    console.log(result)
    const token = jwt.sign({id: result.user_id}, 'secret')
    response.send({token})
})

app.post('/transactions', authenticateToken, async (request, response) => {
    const {userId, type, amount, description, date, category} = request.body;
    if (!type || !amount || !description || !date || !category){
        response.status(400).send({message: 'Missing required fields'})
        return
    }

    const query = `
        INSERT INTO transactions (user_id, type, category, amount, date, description )
        VALUES (?, ?, ?, ?, ?, ?)
    `
    const params = [userId, type, category, amount, date, description]

    try{
        await db.run(query,params)
        response.status(201).send({message: 'Transaction added successfully'})
    }catch(error){
        response.status(500).send({message: 'Error adding transaction'})
    }
})

app.get('/transactions',authenticateToken, async (request, response) => {
    const {page = 1, limit = 10} = request.query
    const userId = request.user
    const pageNum = parseInt(page, 10)
    const limitNum = parseInt(limit, 10)

    const offset = (pageNum - 1) * limitNum
    const query = `
        SELECT * FROM transactions
        where user_id = ?
        LIMIT ${limitNum} OFFSET ${offset}
    `
    let transactions = []
    try{
        const result = await db.all(query, [userId])
        transactions = result
    }catch(error){
        response.status(500).send({message: 'Error fetching transactions'})
    }
    response.send(transactions)

})

app.get('/transactions/:id', authenticateToken, async (request, response) => {
    const {id} = request.params
    const userId = request.user
    console.log(userId)
    const query = `
        SELECT * FROM transactions WHERE id =? AND user_id =?
    `
    try{
        const result = await db.get(query, [id, userId])
        if(!result){
            response.status(404).send({message: 'Transaction not found'})
            return
        }
        response.send(result)
    }catch(error){
        response.status(500).send({message: 'Error fetching transaction'})
    }
})

app.put('/transactions/:id', authenticateToken, async (request, response) => {
    const {id} = request.params
    const userId = request.user
    const {type, amount, description, date, category} = request.body;
    if (!type ||!amount ||!description ||!date ||!category){
        response.status(400).send({message: 'Missing required fields'})
        return
    }
    const query = `
        UPDATE transactions SET type =?, category =?, amount =?, date =?, description =? WHERE id =? AND user_id = ?
    `
    const params = [type, category, amount, date, description, id, userId]
    try{
        const result = await db.run(query, params)
        if(result.changes === 0){
            response.status(404).send({message: 'Transaction not found'})
            return
        }
        response.send({message: 'Transaction updated successfully'})
    }catch(error){
        response.status(500).send({message: 'Error updating transaction'})
    }
})

app.delete('/transactions/:id', authenticateToken, async (request, response) => {
    const {id} = request.params
    const userId = request.user
    const query = `
        DELETE FROM transactions WHERE id =? AND user_id =?
    `
    try{
        const result = await db.run(query, [id, userId])
        if(result.changes === 0){
            response.status(404).send({message: 'Transaction not found'})
            return
        }
        response.send({message: 'Transaction deleted successfully'})
    }catch(error){
        response.status(500).send({message: 'Error deleting transaction'})
    }
})

app.get('/summary', authenticateToken, async (request, response) => {
    const userId = request.user
    const expenses = `
        SELECT SUM(amount) as expenses
        FROM transactions
        WHERE type = 'expense' AND user_id =?
    `
    const income = `
        SELECT SUM(amount) as income
        FROM transactions
        WHERE type = 'income' AND user_id =?
    `
    const exp = await db.get(expenses, [userId])
    console.log(exp)
    const inc = await db.get(income, [userId])
    console.log(inc)
    const balance = inc.income - exp.expenses 
    response.send({Total_Income: inc.income, Total_Expense: exp.expenses, Balance: balance
    })
})