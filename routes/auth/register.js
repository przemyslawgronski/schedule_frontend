const express = require('express');

// Node fetch (https://www.npmjs.com/package/node-fetch)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

// called by react
router.post('/api/users/register', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;

    try{
        // get data from django and send back to react
        const registerResponse = await fetch(`${process.env.API_URL}/api/users/register/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // same as: body: JSON.stringify(req.body);
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
            })
        })

        const data = await registerResponse.json();

        return res.status(registerResponse.status).json(data)
    } catch(err){
        return res.status(500).json({
            error: 'Coś poszło nie tak podczas rejestracji'
        });
    }
});

module.exports = router;