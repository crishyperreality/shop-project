const connection = require('../config/db');
const sha1 = require('sha1');

let sellerController = {};

//READ(todos los vendedores)
sellerController.viewHome = (req,res)=>{
    let sql = `SELECT * FROM seller`;

    connection.query(sql,(err,results)=>{
        if(err)throw err;
        res.render('home', {results})
    })
}

//READ con parametros (vendedor con id seleccionado)
sellerController.viewOneSeller = (req,res)=>{
    let id_seller = req.params.id_seller;
    let sql = `SELECT * FROM seller WHERE id_seller = ${id_seller}`;

    connection.query(sql, (err, resultSeller)=>{
        if(err)throw err;
        //Si no da error, se ejecuta otra query para buscar todos los productos de ese vendedor
        let sqlProducts = `SELECT * FROM product WHERE id_seller = ${id_seller}`;

        connection.query(sqlProducts, (err, resultProducts)=>{
            if(err)throw err;
            res.render('sellers',{ resultSeller: resultSeller[0], resultProducts });
        })
    })
}

//Muestra el formulario de registro
sellerController.viewForm = (req,res)=>{
    res.render('register');
}

//CREATE
//Recoge el input del formulario y los almacena como valores en la base de datos
sellerController.saveSeller= (req,res)=>{
    const image = req.file.filename;

    //Encriptamos el password con la funcionalidad de la librería sha1
    const {name,surname,email,password,description,phone_number} = req.body;
    const encPassword = sha1(password)
    let sql = `INSERT INTO seller(name,surname,email,password,description,phone_number,image) VALUES ('${name}','${surname}','${email}','${encPassword}','${description}', '${phone_number}', '${image}')`;
        connection.query(sql, (err,result)=>{
            if(err)throw err;
            res.redirect('/')
        })
}

//UPDATE
//Muestra el formulario de edicion del usuario con los datos almacenados de éste
sellerController.editSeller = (req,res)=>{
    let id_seller = req.params.id_seller;

    let sql = `SELECT * FROM seller WHERE id_seller = ${id_seller}`;

    connection.query(sql, (err,result)=>{
        if(err)throw err;
        res.render('editSeller', {result: result[0]})
    })

}

//Actualiza los valores, reemplazando los anteriormente almacenados por los del nuevo input
sellerController.updateSeller = (req,res)=>{
    const id_seller = req.params.id_seller;

    let {name,surname,email,password,description,phone_number} = req.body;
    let encPassword = sha1(password)
    let sql = `UPDATE seller SET name = '${name}', surname = '${surname}', email = '${email}', password = '${encPassword}', description = '${description}', phone_number = '${phone_number}'
     WHERE id_seller = ${id_seller}`;
        connection.query(sql, (err,result)=>{
            if(err)throw err;
            res.redirect('/')
        })
}

//DELETE
//Elimina el usuario con el id seleccionado
sellerController.deleteSeller = (req,res)=>{
    let id_seller = req.params.id_seller;

    let sql = `DELETE FROM seller WHERE id_seller = ${id_seller}`;

    connection.query(sql, (err, result)=>{
        if(err)throw err;
        res.redirect('back');
    })
}

module.exports = sellerController;

