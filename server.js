const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Ben',
            email: 'ben@ben.com',
            password: 'ben',
            entries: 0,
            joined: new Date(),
        }, 
        {
            id: '234',
            name: 'Laura',
            email: 'laura@laura.com',
            password: 'laura',
            entries: 0,
            joined: new Date(),
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    // const { password } = req.body;
    // // Load hash from your password DB.
    // bcrypt.compare(password, hash, function(err, res) {
    //     // res == true
    // });
    // bcrypt.compare(password, hash, function(err, res) {
    //     // res = false
    // });
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in');
        }
});

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '345',
        name: name,
        email: email,
        entries: 0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:userId', (req, res) => {
    // const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === req.params.userId) {
          return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json('no such user exists');
    }
});

// app.get('/profile/:userId', (req, res) => {
//     database.users.forEach(user => {
//       if (user.id === req.params.userId) {
//         return res.json(user);
//       }
//     })

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('no such user exists');
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('App is running on port 3000');
});

/*
/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/