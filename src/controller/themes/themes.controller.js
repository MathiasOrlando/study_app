//const { json } = require("sequelize");
const { ThemeModel } = require("../../model/themes.model");
const ThemeService = require("../../service/themes.service");
const {sequelize} = require("../../connection");
//const { ConsultarPorCodigo } = require("../../service/users.service");

const listar = async function(req, res) {
    console.log("Listar temas");
    try {
        const themes = await ThemeService.listar(req.query.filtro || '');

        if(themes && themes){
            res.json({
                success : true,
                temas : themes
            });
        }else{
            res.json({
                success : true,
                temas : []
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
        const ThemeModelResult = await ThemeService.ConsultarPorCodigo(req.params.filtro || '');
       // console.log("theme: ",ThemeModelResult);

        if(ThemeModelResult){
            res.json({
                success : true,
                tema : ThemeModelResult
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

    let temaRetorno = null;
    
    try {
        temaRetorno = await ThemeService.actualizar(req.body.id, 
                                                        req.body.create_date,
                                                        req.body.name, 
                                                        req.body.description, 
                                                        req.body.keywords, 
                                                        req.body.owner_user_id);
        res.json({
            success : true,
            tema : temaRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar tema");
    try{
        await ThemeService.eliminar(req.params.filtro || '');
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