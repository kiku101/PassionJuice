const Product = require('../models/Product');

class ProductController{

    //[GET] /products
    // productRender(req,res){
    //     res.render('products');
    // }

    // //[GET] /products/create
    // createProduct(req,res){
    //     res.render('createProduct');
    // }

    //[GET] /products/detailProduct
    // detail(req,res){
    //     res.render('detailProduct');
    // }

    //[POST] /products/store
    // store(req,res){
    //     Product.create(req.body, (error, product) => {
    //         console.log(req.body);
    //         if (error) {
    //             // console.log(error);
    //             return res.redirect('/product/create');
    //         }
    //         console.log('OK');
    //           res.redirect('/');
    //     })
    // }

    // //[POST] / products/update
    // updateProduct(req,res){
        
    // }

    // //[POST] / products/deleteProduct
    // deleteProduct(req,res){

    // }

}

module.exports =new  ProductController;
