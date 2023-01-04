const express = require('express');
const cookie = require('cookie');
// Dlaczego nie: `const fetch = ...`? Deklarujemy tu niepotrzebnie i nieelegancko zmienną globalną.
fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

// Post request /api/users/login
router.post('/api/users/login', async (req, res)=>{
    // Api request to django  backend api token route (api/token/)
    // Store token in cookie

    const {email, password} = req.body;

    try {
        // API_URL set to localhost:8000 (django) in env
        const apiResponse = await fetch(`${process.env.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data = await apiResponse.json();

        if (apiResponse.status === 200){
            // Set cookies if successful
            res.setHeader('Set-Cookie',[
                cookie.serialize('access', data.access, {
                    httpOnly: true,
                    maxAge: 60*30, // 30 mins as in django settings (SIMPLE_JWT)
                    path: '/api/', // Allowed cookie path !
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production' // if website is in production mode (development equals false)
                }),
                cookie.serialize('refresh', data.refresh, {
                    httpOnly: true,
                    maxAge: 60*60*24, // 1 day
                    path: '/api/', // Allowed cookie path !
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production' // if website is in production mode (development equals false)
                })
            ])

            return res.status(200).json({ success: 'Log in successfully' });
        } else {
            return res.status(apiResponse.status).json(data)
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Something went wrong when logging in',
        })
    }

})

module.exports = router;