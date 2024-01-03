const express = require('express')
const app = express.Router()
const {client} = require('./db')

//always starts with /api 

//GET /api/users
app.get('/users', async(req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM users
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

app.get('/places', async(req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM places
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

app.get('/vacations', async(req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM vacations
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

app.post('/vacations', async(req,res,next)=> {
    try {
        const SQL = `
            INSERT INTO vacations(user_id, place_id)
            VALUES ($1, $2)
            RETURNING *
        `
        console.log(req.body)
        const response = await client.query(SQL, [req.body.user_id, req.body.place_id])
        res.send(response.rows[0])
    } catch (error) {
        next(error)
        
    }
})

module.exports = app