//const { json } = require("sequelize");
const { ThemeModel } = require("../model/themes.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("listar temas");
    try {
        const themes = await sequelize.query(`SELECT * 
                                    FROM themes 
                                    Where 1 = 1
                                        AND UPPER(name) LIKE UPPER('%${txtbuscar}%') 
                                    ORDER BY id`);
    //    console.log("temas: ",themes);
        if(themes && themes[0]){
            return themes[0];
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const ConsultarPorCodigo = async function(codigo) {
    console.log("Consultar tema ");
    try {
        const themesModelResult = await ThemeModel.findByPk(codigo);

        if(themesModelResult){
            return themesModelResult/*[0]*/;
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, create_date, name, description, keywords, owner_user_id) {
    console.log("actualizar temas");

    let retorno = null;
    const data = {id, create_date, name, description, keywords, owner_user_id};
    
    try {
        let existe = null;
        if(id){
            existe = await ThemeModel.findByPk(id);
        }
        if (existe) {
            //Confirma que existe y actualiza
            retorno = await ThemeModel.update(data, { where : {id : id}});
            retorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("tema Service actualizado");
        } else {
            //agg sino
            retorno = await ThemeModel.create(data);
            console.log("Nuevo tema Service");
        }
        return retorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(re,res) {
    console.log("eliminar tema ");
    try{
        await ThemeModel.destroy({where: {id:codigo }},{truncate:false});
        console.log("Tema eliminado");
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, ConsultarPorCodigo, actualizar, eliminar
};