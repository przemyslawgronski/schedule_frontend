const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router()

// Get request
router.get('/api/users/me', async (req, res)=>{
    // Request to django backend api
    const {access}=req.cookies;

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/users/me`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`
            }
        });

        const data = await apiResponse.json();

        //Mirror back django data
        return res.status(apiResponse.status).json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Something went wrong when trying to retrieve user',
        });
    }
})

module.exports = router;