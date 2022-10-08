const express = require('express');
const admin = require('firebase-admin');

require('dotenv').config();

const router = express.Router();

router.get('/users', async (req,res)=> {
    console.log("Executing Get All Users route...")
    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_KEY)
    });

    const db = admin.firestore();
    const results = [];
    
    try{
        const snapshot = await db.collection(process.env.USER_COLLECTION).get();
        snapshot.forEach(doc=>{
        results.push(doc.data());
        });
        console.log("Get All User route executed successfully...")
        return res.status(200).json({users: results});
    }catch(err){
        console.log(`Error executing Ger All Users route: ${err}`)
        return res.status(err.code).send(err.message);
    }
});

module.exports = router;