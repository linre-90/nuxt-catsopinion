const app = require('express')()
const express = require("express");
//const MongoClient = require('mongodb').MongoClient;
const infoHeaders = ["PAGE_VISIT", "APP_LAUNCH", "BLOG_POST_READ", "CLICK"];
const errorHeaders = ["ERROR"];

app.use(express.json());

/** Api route to log events in web site*/
app.post('/', async (req, res) => {
    /*
    Remove commented blocks at some point
    if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"){ 
        const client = new MongoClient(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        res.setHeader("access-control-allow-origin", process.env.MY_URL);
        res.setHeader('access-control-allow-methods', 'POST');
        res.setHeader('access-Control-allow-headers', 'Content-Type');
        res.type("application/json");
        res.setHeader("x-content-type-options", "nosniff");
        res.setHeader("x-frame-options", "SAMEORIGIN");
        res.setHeader("x-xss-protection", "1; mode=block");
        try {
            await client.connect();
            const collection = client.db(process.env.MONGO_DB).collection(process.env.MONGO_COLLECTION);
            const p = await collection.insertOne(req.body);
            client.close();
        } catch (error) {
            client.close();
        } finally{
            if(client){
                client.close();
            }
            res.sendStatus(200);
        }*/
        if(req.body){
            if(infoHeaders.includes(req.body.logtype)){
                console.info(req.body);
            }
            else if(errorHeaders.includes(req.body.logtype)){
                console.error(req.body);
            }
            else{
                console.warn(
                    {
                        "reason": "Unknown log attempt", 
                        "possibleCauses": "Missing log type, Missing info",
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
        res.sendStatus(200);
    //}else{
        //res.sendStatus(200);
    //}
    
})

module.exports = app
