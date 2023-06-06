const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const url = require('url');
// Initialiazing
const app = express();
const Port = 3000;

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
const content = {
    'users': []
}
const file_data = fs.readFileSync('users.json');

try {
    content.users = JSON.parse(file_data).users;
} catch (error) {
    console.log('File empty');
}

app.get('/', (req, res) => {
    res.render('index', {active: 'index'});
});

app.get('/Users', (req, res) => {
    res.render('list', {active: 'users', content: content.users});
});

app.get('/Edit', (req, res) => {

    const params = url.parse(req.url, true).query;
    // const current_user = content.users.find(u => u.uniqueId === params.id);
    if (current_user = content.users.find(u => u.uniqueId === params.id)) {
        res.render('edit', {user: current_user});
    } else {
        res.status(400);
    }
});

app.post('/createUser', (req, res) => {
    // const {username, name, email, age} = req.body;
    content.users.push({
        'uniqueId' : uuidv4(),
        ...req.body
    });

    fs.writeFile('users.json', JSON.stringify(content), () => {
        res.redirect('Users');
    });
});

app.post('/update', (req, res) => {
    const {uniqueId, username, name, email, age} = req.body;
    
    if (current_user = content.users.find(u => u.uniqueId === uniqueId)) {
        const position = content.users.indexOf(current_user);
        content.users[position] = {
            ...req.body
        }
    }

    fs.writeFile('users.json', JSON.stringify(content), () => {
        res.redirect('Users');
    });

});

app.post('/delete', (req, res) => {
    const { uniqueId } = req.body;

    if (current_user = content.users.find(u => u.uniqueId === uniqueId)) {
        const position = content.users.indexOf(current_user);
        content.users.splice(position, 1);
    }

    fs.writeFile('users.json', JSON.stringify(content), () => {
        res.redirect('Users');
    });

});


app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});