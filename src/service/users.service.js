//const { json } = require("sequelize");
const { UserModel } = require("../../src/model/users.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("listar usuarios Service");
    try {
        const users = await sequelize.query(`SELECT * 
                                    FROM users 
                                    Where 1 = 1
                                        AND UPPER(name) LIKE UPPER('%${txtbuscar}%') 
                                        AND deleted IS false
                                    ORDER BY id`);
      //  console.log("users",users);
        if(users && users[0]){
            return users[0];
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const ConsultarPorCodigo = async function(codigo) {
    console.log("Consultar usuario por codigo");
    try {
        const UserModelResult = await UserModel.findByPk(codigo);

        if(UserModelResult){
            return UserModelResult/*[0]*/;
        }else{
            return [];
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, name, last_name, avatar, email, password, deleted ) {
    console.log("actualizar usuarios");

    let usuarioRetorno = null;
    const data = {id, name, last_name, avatar, email, password, deleted};
    
    try {
        let userExiste = null;
        if(id){
            userExiste = await UserModel.findByPk(id);
        }
        if (userExiste) {
            //Confirma que el usuario existe y actualiza
            usuarioRetorno = await UserModel.update(data, { where : {id : id}});
            usuarioRetorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("usuario actualizado Service");
        } else {
            //agg sino
            usuarioRetorno = await UserModel.create(data);
            //console.log("Nuevo usuario Service");
        }
        return usuarioRetorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(codigo) {
    console.log("eliminar usuario");
    try{
        //await UserModel.destroy(txtid);
        await sequelize.query(`UPDATE users SET deleted = true WHERE id = ${codigo}`);
        
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, ConsultarPorCodigo, actualizar, eliminar
};