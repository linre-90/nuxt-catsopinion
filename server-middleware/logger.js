const app = require('express')()
const express = require("express");
const infoHeaders = ["PAGE_VISIT", "APP_LAUNCH", "BLOG_POST_READ", "CLICK"];
const errorHeaders = ["ERROR"];
const warningHEaders = ["WARNING"];

app.use(express.json());

/** Api route to log events in web site*/
app.post('/', async (req, res) => {
    if(req.body && parseInt(process.env.ENABLE_LOGS) === 1){
        const logString = `appid=${req.body.appid}, time=${req.body.time}, logtype=${req.body.logtype}, visitedpage=${req.body.visitedpage}, locale=${req.body.locale}, device=${req.body.device}, link=${req.body.link}, detail=${req.body.detail}, cookies=${req.body.cookies}`;
        if(infoHeaders.includes(req.body.logtype)){
            console.info(logString);
        }
        else if(errorHeaders.includes(req.body.logtype)){
            console.error(logString);
        }
        else if(warningHEaders.includes(req.body.logtype)){
            console.warn(logString);
        }
        else{
            console.warn("reason=Unknown log attempt, possibleCauses=Missing log type, Missing info, Possible attack logEntry" + logString);
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
});

module.exports = app
