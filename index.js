const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config(); // read .env variables

const loginRoute = require('./routes/auth/login')
const logoutRoute = require('./routes/auth/logout')
const meRoute = require('./routes/auth/me')
const registerRoute = require('./routes/auth/register')
const verifyRoute = require('./routes/auth/verify')
const authRoute = require('./routes/schedule/authReq')

//middleware to allow req.body to work (register.js file)
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(registerRoute);
app.use(verifyRoute);
app.use(authRoute);

app.use(express.static('client/build'));
app.get('*',(req, res) => {
    const myPath = path.resolve(__dirname, 'client', 'build', 'index.html');
    return res.sendFile(myPath);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);