const express = require('express');
const admin = require('firebase-admin');

require('dotenv').config();

const router = express.Router();

router.get('/products', async (req,res)=> {

    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_KEY)
    });

    const db = admin.firestore();

    const results = [];
    try{
        const snapshot = await db.collection(process.env.PRODUCT_COLLECTION).get();
        snapshot.forEach(doc=>{
           results.push(doc.data());
        });
        return res.status(200).json({users: results});
    }catch(err){
        return res.status(err.code).send(err.message);
    }
});

module.exports = router;