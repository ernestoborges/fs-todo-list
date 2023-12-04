import express from 'express'
import { pool } from "./db/connect"

const app = express()

app.get("/", async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.send(users.rows[0]);
    } catch (err) {
        console.log(err)
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})