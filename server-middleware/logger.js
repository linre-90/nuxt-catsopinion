const app = require('express')()
const express = require("express");
const infoHeaders = ["PAGE_VISIT", "APP_LAUNCH", "BLOG_POST_READ", "CLICK"];
const errorHeaders = ["ERROR"];
const warningHEaders = ["WARNING"];

app.use(express.json());

/** Api route to log events in web site*/
app.post('/', async (req, res) => {
    if(req.body && parseInt(process.env.ENABLE_LOGS) === 1){
        if(infoHeaders.includes(req.body.logtype)){
            console.info(req.body);
        }
        else if(errorHeaders.includes(req.body.logtype)){
            console.error(req.body);
        }
        else if(warningHEaders.includes(req.body.logtype)){
            console.warn(req.body);
        }
        else{
            console.warn(
                {
                    "reason": "Unknown log attempt", 
                    "possibleCauses": "Missing log type, Missing info, Possible attack",
                    "logEntry": req.body
                }
            );
        }
    }
    res.setHeader("access-control-allow-origin", process.env.MY_URL);
    res.setHeader('access-control-allow-methods', 'POST');
    res.setHeader('access-Control-allow-headers', 'Content-Type');
    res.type("application/json");
    res.setHeader("x-content-type-options", "nosniff");
    res.setHeader("x-frame-options", "SAMEORIGIN");
    res.setHeader("x-xss-protection", "1; mode=block");
    res.setHeader("x-powered-by", "someTech");
    res.sendStatus(200);
})

module.exports = app
