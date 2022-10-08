const express = require ('express');
const { json } = require('body-parser');
const { urlencoded } = require('express');
const getUsers = require('./routes/getUsers');
const getProducts = require('./routes/getProducts');
const getProductId = require('./routes/getProductId')
const morgan = require('morgan');

const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('tiny'))

app.use(getUsers);
app.use(getProducts);
app.use(getProductId);

module.exports = app;
