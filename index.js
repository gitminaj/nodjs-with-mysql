const express = require('express');
// morgan give the detail about the reques, help ful for debugging
const morgan = require('morgan');
const pool  = require('./config/db');
const app = express();

const studentRoutes = require('./routes/studentRoutes')




const PORT = 8000;

// middleware

 // to recive json data from req body
app.use(express.json())

app.use(morgan("dev"));


// routes

app.use('/api/v1/students', studentRoutes )

app.get('/', (req , res)=>{
  res.send("<h1> homes page </h1>");
})


// listen
pool.query('SELECT 1')
.then((data)=>{
    console.log("mysqldb connected");

    app.listen(PORT, ()=>{ console.log("server connected") });
})
.catch((err)=>{
    console.log(err);
})


