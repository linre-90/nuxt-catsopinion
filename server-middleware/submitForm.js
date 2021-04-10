const app = require('express')()
const express = require("express");
const axios = require("axios");

app.use(express.json());

app.post('/', async (req, res) => {
        const options = {
            method: "POST",
            data: req.body,
            headers:{
                "Content-Type": "application/json",
                "X-Api-Key": process.env.FORM_SUBMIT_KEY,
                "Access-Control-Allow-Origin":"*"
            },
            url: process.env.FORM_SUBMIT_URL
        }
        const response = await axios(options);
        res.json(response.data);
    
});

module.exports = app