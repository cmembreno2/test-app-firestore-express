const express = require('express');
const admin = require('firebase-admin');

require('dotenv').config();

const router = express.Router();

router.post('/productid', async (req,res)=>{
    const {productos} = req.body;

    console.log("Executing Get Product by Id route...")
    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_KEY)
    });

    const db = admin.firestore();
    //let producto = {};
    let resultados = [1];
    let sum = 0

 
        productos.forEach(  prod =>{
            db.collection(process.env.PRODUCT_COLLECTION).doc(prod).get()
            .then(doc=>{
            resultados.push(doc.data().precio)
            console.log(doc.data().precio)
            console.log(resultados)
            })
        })
        console.log(resultados)
        for (let i = 0; i < resultados.length; i++) {
            sum += resultados[i];
         }
        console.log(sum)
        console.log("Get Product By Id route executed successfully...")
        return res.status(200).json({sucess: sum});

});

module.exports = router;