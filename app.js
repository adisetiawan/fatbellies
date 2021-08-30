require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',  (req, res) => {
    res.json({msg : 'Hello World'});
});

//require router files
const branch = require('./routes/branch');
const guest = require('./routes/guest');
const meal = require('./routes/meal');
const session = require('./routes/session');
const reservation = require('./routes/reservation');
const search = require('./routes/search');
//get all available routes
app.use('/branch', branch);
app.use('/guest', guest);
app.use('/meal', meal);
app.use('/session', session);
app.use('/reservation', reservation);
app.use('/search', search);

//handle error
app.use((err, req, res, next) => {
    //check if error from Joi validationError
    //https://joi.dev/api/?v=17.4.2#validationerror
    if (err.isJoi) {
        err.statusCode = 400;
    }
    //others error code
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    console.error(err.stack);
    return res.status(err.statusCode).json({ error: err.toString() });

});

module.exports = app;