const app = require('express')()
const express = require("express");
const axios = require("axios");

app.use(express.json());

app.post('/', async (req, res) => {
    if(process.env.NODE_ENV === "production"){
        const options = {
            method: "POST",
            data: req.body,
            headers:{
                "Content-Type": "application/json",
                "X-Api-Key": process.env.LOGGER_KEY,
                /*"Access-Control-Allow-Origin":"*"*/
            },
            url: process.env.LOGGER_API
        }
        axios(options);
        res.sendStatus(200);
    }
})

module.exports = app