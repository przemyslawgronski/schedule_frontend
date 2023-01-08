const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router()

// post, get, delete... requests with authentication
router.all('/api/schedule*', async (req, res)=>{
    // Request to django backend api
    const {access}=req.cookies;
    const {url, method, body} = req;

    requestParam = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        },
    }

    // If it's a GET method than add body
    if(method !== "GET"){ // Działa, ale czy dobrze ?
        requestParam.body = JSON.stringify(body);
    }

    try {
        const apiResponse = await fetch(`${process.env.API_URL}${url}`, requestParam);

        const data = await apiResponse.json();

        //Mirror back django data
        return res.status(apiResponse.status).json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Something went wrong when trying to receive data',
        });
    }
})

module.exports = router;