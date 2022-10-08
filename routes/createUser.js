const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();
const router = express.Router();

router.post('/createuser', async (req,res)=> {

    const {id, email, first_name, last_name, is_active} = req.body;

    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_KEY)
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
  };

    try{
    db.collection(process.env.USER_COLLECTION).doc(data.id.toString()).set(data);
    await sgMail.send(template);
    }catch(err){
        return res.status(err.code).send(err.message);
    }

    res.status(200).send({success:200});
});

module.exports = router;
