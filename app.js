// const express = require("express");
import express from 'express';
import ProductManager from "./productManager.js"

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true} ));

app.listen(PORT, () => {
    console.log(`example app listening op port ${PORT}`);
});

const productManager = new ProductManager();
const readProduct = productManager.getProduct();

app.get("/products",(req, res) => {
    if(req.query.limit && req.query.limit>0 && req.query.limit<=readProduct.length){
        res.json(readProduct.slice(0, req.query.limit));
    }else{
        res.send(readProduct);
    }
});

app.get("/products/:pid",(req, res) => {
    let id = parseInt(req.params.pid);
    let product = productManager.getProductById(id);
    console.log(product);
if(product){
res.json(product);
}else{
    res.send("id no encontrado");
}
    
});
