const express = require('express');
const admin = require('firebase-admin');

require('dotenv').config();

const router = express.Router();

router.get('/products', async (req,res)=> {

    console.log("Executing Get All Products route...")
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
        console.log("Get All Products route executed successfully...")
        return res.status(200).json({produtcs: results});
    }catch(err){
        console.log(`Error executing Get All Products route: ${err}`)
        return res.status(err.code).send(err.message);
    }
});

module.exports = router;