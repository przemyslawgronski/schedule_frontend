const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router()

// Get request
router.get('/api/users/verify', async (req, res)=>{
    // Request to django backend api
    const {access}=req.cookies;

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/token/verify/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: access }),
        });

        const data = await apiResponse.json();

        return res.status(apiResponse.status).json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Something went wrong when trying to verify login status',
        });
    }
})

module.exports = router;