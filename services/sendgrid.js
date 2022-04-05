//Packages
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

//Set Sendgrid ApiKey
const apiKey= process.env.API_KEY;
sgMail.setApiKey(apiKey);

//Export Sendgrid service
module.exports = sgMail;