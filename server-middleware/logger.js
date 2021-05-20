const app = require('express')()
const express = require("express");
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());

/** Api route to log events in web site */
app.post('/', async (req, res) => {
    if(process.env.NODE_ENV === "production"){ 
        console.log(req.headers.accept)
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
            console.error(error);
        } finally{
            if(client){
                client.close();
            }
            res.sendStatus(200);
        }
    }else{
        res.sendStatus(200);
    }
})

module.exports = app

/* example input
{                                                                                                             10:57:47
  appid: '5153_1621497242926',
  time: '2021-05-20T07:57:47.042Z',
  logtype: 'PAGE_VISIT',
  visitedpage: '/fi/contact',
  locale: 'fi',
  device: 1920,
  link: '',
  detail: '',
  cookies: true
}



*/