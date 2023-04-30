require('dotenv').config()
const mysql = require("mysql2");
const conn = mysql.createConnection(process.env.DATABASE_URL)
conn.connect((error)=>{
    if(error) throw error;
    console.log("connected!")
});

module.exports = conn