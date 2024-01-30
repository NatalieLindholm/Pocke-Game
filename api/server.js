const express = require('express');
const pg = require ('pg')
require('dotenv').config()
const cors = require('cors')

const db = new pg.Client({
 user: process.env.USER,
 database: process.env.DATABASE,
 password: process.env.PASSWORD,
 host: process.env.host
})

db.connect().then(res=>console.log('connected'))

const server = express();
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.get('/api/pokemon', async (req, res)=>{
    const data = await db.query('SELECT * FROM Pokemon')
    res.json(data.rows)
})

server.post('/api/pokemon', async (req, res)=>{
console.log(req.body);
 try {
    await db.query('INSERT INTO poke(name) VALUES($1)', [req.body.name])
    res.json({msg: 'saved'})
 } catch (error) {
    console.log(error);
 }
})

server.listen(3000)
