//const { json } = require("sequelize");
const { Theme_PropertiesModel } = require("../model/themes_properties.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("listar propiedades de tema");
    try {
        const themes_Properties = await sequelize.query(`SELECT *       
                                    FROM themes_Properties 
                                    Where 1 = 1
                                        AND UPPER(property_name) LIKE UPPER('%${txtbuscar}%') 
                                    ORDER BY id`);
    //    console.log("temas: ",themes);
        if(themes_Properties && themes_Properties[0]){
            return themes_Properties[0];
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const BuscarPorCodigo = async function(codigo) {
    console.log("Consultar propiedades de tema ");
    try {
        const themes_PropertiesModelResult = await Theme_PropertiesModel.findByPk(codigo);

        if(themes_PropertiesModelResult){
            return themes_PropertiesModelResult/*[0]*/;
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, theme_id, property_name, property_value) {
    console.log("actualizar propiedades de tema");

    let retorno = null;
    const data = {id, theme_id, property_name, property_value};
    
    try {
        let existe = null;
        if(id){
            existe = await Theme_PropertiesModel.findByPk(id);
        }
        if (existe) {
            //Confirma que existe y actualiza
            retorno = await Theme_PropertiesModel.update(data, { where : {id : id}});
            retorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("tema_p Service actualizado");
        } else {
            //agg sino
            retorno = await Theme_PropertiesModel.create(data);
            console.log("Nuevo tema_p Service");
        }
        return retorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(req,res) {
    console.log("eliminar propiedades de tema ");
    try{
        await Theme_PropertiesModel.destroy({where: {id:codigo }},{truncate:false});
        console.log("propiedades de tema eliminado");
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, BuscarPorCodigo, actualizar, eliminar
};