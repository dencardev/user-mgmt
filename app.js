// declare all the dependencies installed
const express = require('express');
const exphbs = require('express-handlebars');
const imgFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

// declaring port for setting the express server
const app = express();
const port = process.env.PORT || 5000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Parse application/json
app.use(bodyParser.json());

//Static Files
app.use(express.static('public'));

//default option for file upload
app.use(imgFileUpload());

//Templating Engine
//instead of using exphbs(), put .engine to get rid of the error exphbs is not a function.
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');


//Connecting to Database
//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//Connecting to Database
pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log(`Connected as ID` + connection.threadId);
});


//declare path to routes folder
const routes = require('./server/routes/user');
const fileUpload = require('express-fileupload');
app.use('/', routes);
//app.use('/leavemgmt', routes);


app.listen(port, () => console.log(`Listening on Port ${port}`));