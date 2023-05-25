var express = require('express')
var cors = require('cors')
var app = express()
const mysql = require('mysql2');
require('dotenv').config()


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + "/public"));



app.get('/users', function (req, res, next) {


    const q = "SELECT * FROM `test`"

    connection.query(q, (err,data)=>{
        res.json(data)
    })


})

app.post('/user', function (req, res, next) {
    const name = req.body.name
    const q = "INSERT INTO `test` (name) VALUE (?)"

    connection.query(q, [name], (err,data)=>{
        if(err) return res.json(err)
        res.json(data)
    })


})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

module.exports = app