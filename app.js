require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require router files
const branch = require('./routes/branch');
const guest = require('./routes/guest');
const meal = require('./routes/meal');
const session = require('./routes/session');
const reservation = require('./routes/reservation');

app.get('/',  (req, res) => {
    res.json({msg : 'Hello World'});
});

app.use('/branch', branch);
app.use('/guest', guest);
app.use('/meal', meal);
app.use('/session', session);
app.use('/reservation', reservation);


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});