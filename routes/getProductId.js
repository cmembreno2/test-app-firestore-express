const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();

const router = express.Router();

router.post('/productid', async (req,res)=>{

    console.log("Ejecutando la ruta para consultar los precios por id de producto y calcular el total de la orden...")

    const {productos} = req.body;

    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_KEY)
    });

    const db = admin.firestore();
    let resultados = [];
    let sum = 0

    try{
 
        for (let i = 0; i < productos.length; i++){
            const productId = await db.collection(process.env.PRODUCT_COLLECTION).doc(productos[i]).get();
            console.log(`El precio del producto con id ${productos[i]} es ${productId.data().precio} cordobas`)
            resultados.push(productId.data().precio);
        }

        for (let i = 0; i < resultados.length; i++) {
            sum += resultados[i];
         }

        console.log(`El total de la orden es: ${sum}`)
        return res.status(200).json({total_de_la_orden: sum});

    }catch(err){
        console.log(`Error consultado los precios y calculando el total: ${err}`);
        return res.status(err.code).send(err.message);
    }
});

module.exports = router;