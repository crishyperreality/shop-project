let connection = require('../config/db');

let productController = {};

//READ(todos los vendedores)
productController.viewAllProducts = (req,res)=>{
    let sql = `SELECT * FROM product`;

    connection.query(sql, (err,results)=>{
        if(err)throw err;
        res.render('products',{results})
    })
}

//READ con parametros (producto con id seleccionado)
//Para poder extraer los datos del objeto en un producto y poder reutilzarlos
productController.viewOneProduct = (req,res)=>{
    let id_product = req.params.id_product;
    let sql = `SELECT * FROM product WHERE id_product = ${id_product}`

    connection.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result)
    })
}

//CREATE
//Recoge el input del formulario y los almacena como valores en la base de datos
productController.saveProduct = (req,res)=>{
    let image = req.file.filename;
    let id_seller = req.params.id_seller;
    let {name, description} = req.body;

    let sql = `INSERT INTO product(name, description, image, id_seller) VALUES ('${name}', '${description}', '${image}', ${id_seller})`;
    connection.query(sql,(err,result)=>{
        if(err)throw err;
        res.redirect('back');
    })

}

//UPDATE
//Muestra el formulario de edicion del producto con los datos almacenados de éste
productController.editProduct = (req,res)=>{
    let id_product = req.params.id_product;

    let sql = `SELECT * FROM product WHERE id_product = ${id_product}`;
    
    connection.query(sql, (err,result)=>{
        if(err)throw err;
        res.render('editProduct', {result: result[0]})
    })
}

//Actualiza los valores, reemplazando los anteriormente almacenados por los del nuevo input
productController.updateProduct = (req,res)=>{
    const id_product = req.params.id_product;
    let {name, description} = req.body;

    let sql = `UPDATE product SET name = '${name}', description = '${description}' WHERE id_product = ${id_product}`;
    connection.query(sql, (err,result)=>{
        if(err)throw err;
        res.redirect('/products')
    })
}

//DELETE
//Elimina el producto con el id seleccionado
productController.deleteProduct = (req,res)=>{
    let id_product = req.params.id_product;

    let sql = `DELETE FROM product WHERE id_product = ${id_product}`;

    connection.query(sql, (err, result)=>{
        if(err)throw err;
        res.redirect('back');
    })
};

module.exports = productController;