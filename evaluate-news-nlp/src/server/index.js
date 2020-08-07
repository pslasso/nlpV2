var path = require('path')
const express = require('express')
var request = require("request");

const app = express()

app.use(express.static('dist'))
const dotenv = require('dotenv');
dotenv.config();
console.log(__dirname)

/* Middleware*/

const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// TODO-ROUTES!

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
});

app.get('/all', function(req, res) {
    function getData(req, res) {
        res.send(data)
        console.log(data)
    }
});

app.post('/analyse', analyse)

function analyse(req, res) {
    newEntrie = {
        feelings: req.body.feelings
    }
    data.push(newEntrie)
    res.send(data)
    console.log(data)
}


// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})