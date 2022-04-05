const express = require('express');
const admin = require('firebase-admin');
const sgMail = require('../services/sendgrid');
const verificarToken = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();

router.post('/createuser', verificarToken, async (req,res)=> {

    const {id, email, first_name, last_name, is_active} = req.body;

    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert({
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
        })
    });

    const db = admin.firestore();

    const data = {
    id,
    email,
    first_name,
    last_name,
    is_active
    };

    const template = {
    to: email,
    from: {
      email: process.env.COMPANY_EMAIL,
      name: process.env.COMPANY_NAME
    },
    template_id : process.env.TEMPLATE_ID
    //To work with sandBoxMode param:
    //mail_settings: {
      //sandbox_mode: {
        //enable: sandboxMode
      //}
    //}
  };

    try{
    db.collection('users').doc(data.id.toString()).set(data);
    await sgMail.send(template);
    }catch(err){
        return res.status(err.code).send(err.message);
    }

    res.status(200).send({success:200});
});

module.exports = router;