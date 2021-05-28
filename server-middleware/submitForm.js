const app = require('express')()
const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const joi = require("joi");
const regex = /^[^<>\/":;$';={}&*]+$/;

const messageSchema = joi.object({
    headline: joi.string().min(1).max(20).pattern(regex),
    type: joi.string().valid("bug", "question", "other"),
    email: joi.string().email().pattern(regex).allow(null, ""),
    message: joi.string().min(20).max(400).pattern(regex),
    time: joi.number().integer().min(15)
});


app.use(express.json());

// api route to send contact form
app.post('/', async (req, res) => {
    res.setHeader("access-control-allow-origin", process.env.MY_URL);
    res.setHeader('access-control-allow-methods', 'POST');
    res.setHeader('access-Control-allow-headers', 'Content-Type');
    res.type("application/json");
    res.setHeader("x-content-type-options", "nosniff");
    res.setHeader("x-frame-options", "SAMEORIGIN");
    res.setHeader("x-xss-protection", "1; mode=block");
    res.setHeader("x-powered-by", "someTech");
    if(req.body){         
        let validateName = true;
        if(req.body.axiosData.name.length > 0){
            validateName = false;
        }
        const { error, value } = messageSchema.validate(
            {
                headline: req.body.axiosData.headline,
                type: req.body.axiosData.type,
                email: req.body.axiosData.email,
                message: req.body.axiosData.message,
                time:req.body.axiosData.fillTime
            },
            { stripUnknown: true }
        );
        if (!error && validateName) {
            let transporter;
            const mail = {
                from: req.body.axiosData.email || "emptySender@catsopinion.com", 
                to: process.env.RECEIVER, 
                subject: req.body.axiosData.type + "  /  " + req.body.axiosData.headline, 
                message: req.body.axiosData.message
            }
            try {
                transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    auth:{
                        user: process.env.USER,
                        pass: process.env.SMTP_KEY
                    }
                });

                await transporter.sendMail({
                    from: mail.from,
                    to:mail.to,
                    subject:mail.subject,
                    message:mail.message,
                    html: `<p>${mail.message}</p>`
                });
                transporter.close();
                res.sendStatus(200);
            } catch (error) {
                if(transporter){
                    transporter.close();
                }
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(422);
        }  
    }else{
        res.sendStatus(400);
    }

});

module.exports = app
