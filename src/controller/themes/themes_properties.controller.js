//const { json } = require("sequelize");
const { Theme_PropertiesModel } = require("../../model/themes_properties.model");
const themes_propertiesService = require("../../service/themes_properties.service");
const {sequelize} = require("../../connection");
//const { ConsultarPorCodigo } = require("../../service/users.service");

const listar = async function(req, res) {
    console.log("Listar propiedades de tema");
    try {
        const themes_Properties = await themes_propertiesService.listar(req.query.filtro || '');

      

        if(themes_Properties && themes_Properties){
            res.json({
                success : true,
                temas : themes_Properties
            });
        }else{
            res.json({
                success : true,
                temas_Properties : []
            });
        }

    } catch(error) {
        console.log(error);
        res.json({
            success : false,
            error : error.message
        });
    }
};

const BuscarPorCodigo = async function(req, res) {
    console.log("Consultar tema");
    try {
        const Theme_PropertiesModelResult = await themes_propertiesService.BuscarPorCodigo(req.params.filtro || '');
       // console.log("theme: ",ThemeModelResult);

        if(Theme_PropertiesModelResult){
            res.json({
                success : true,
                tema : Theme_PropertiesModelResult
            });
        }else{
            res.json({
                success : true,
                tema : null //porque no existe
            });
        }
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const actualizar = async function(req, res) {
    console.log("actualizar temas");

    let tema_PropertiesRetorno = null;                  
    
    try {
        tema_PropertiesRetorno = await themes_propertiesService.actualizar(req.body.id, 
                                                        req.body.theme_id,
                                                        req.body.property_name, 
                                                        req.body.property_value);
        res.json({
            success : true,
            tema : tema_PropertiesRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar propiedades de tema");
    try{
        await themes_propertiesService.eliminar(req.params.filtro || '');
        res.json({
            success : true
        });
       // console.log("Eliminado tema nro: ",req.params.id);
    } catch(error) {
        console.log(error);
        res.json({
            success : false,
            error : error.message
        });
    }
    
};

module.exports = {
    listar, BuscarPorCodigo, actualizar, eliminar
};