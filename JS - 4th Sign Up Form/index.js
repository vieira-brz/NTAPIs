const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/')

var db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to database!'));
db.once('open', () => console.log('Conected to database!'));

app.post('/signup', (req, res) => {
    var { name, email, phno, pass } = req.body;

    var data = {
        name, email, phno, pass
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log('Record Inserted Successfully');
    });

    return res.redirect('signup_success.html');
});

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });

    return res.redirect('index.html');
}).listen(3000);

console.log('Listening on PORT 3000!');