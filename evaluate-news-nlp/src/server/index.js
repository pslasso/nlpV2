let baseURL = 'https://api.meaningcloud.com/sentiment-2.1'
let apiKey = process.env.API_KEY;
let lang = '&lang=en'

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


app.post('/analyse', async(req, res) => {
    try {
        const analyse = await post(`${baseURL}${apiKey}${lang}&txt=${req.body.formText}`);

        const { data } = analyse;

        const { agreement } = data;
        const { subjectivity } = data;
        const { confidence } = data;
        const { irony } = data;

        sentiment = {
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony,
        };
        console.log(data)

    } catch (error) {
        console.log(`${error}`);
    }
});

app.get("/all", (req, res) => {
    res.send(sentiment);
});



// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})