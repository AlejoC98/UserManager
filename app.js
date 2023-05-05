const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// Initialiazing
const app = express();
const Port = 4000;

// Setting the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Setting where my folders are for css and js
app.use(express.static('public'));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// Setting for json response
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// accessing
const readStream = fs.createReadStream('users.json');
const writeStream = fs.createWriteStream('users.json', { flags: 'a'});

function readUserFile() {
    readStream.on('data', chunk => {
        if (chunk)
            console.log(chunk);
    });
    
}

let users = [];

app.get('/', (req, res) => {
    readUserFile();
    res.render('index');
});

app.post('/createUser', (req, res) => {
    // const {username, name, email, age} = req.body;
    users.push({
        ...req.body,
        'uniqueId' : uuidv4()
    });

    writeStream.write(JSON.stringify(users));

    res.redirect('index');

});


app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});