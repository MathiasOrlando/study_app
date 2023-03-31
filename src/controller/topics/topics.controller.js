//const { json } = require("sequelize");
const { TopicModel } = require("../../model/topics.model");
const TopicService = require("../../service/topics.service");
const {sequelize} = require("../../connection");

const listar = async function(req, res) {
    console.log("Listar topicos");
    try {
        const topics = await TopicService.listar(req.query.listar || '');
        //console.log("Listar topicos");

        if(topics){
            res.json({
                success : true,
                topicos : topics
            });
        }else{
            res.json({
                success : true,
                topicos : []
            });
        }

    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const buscarPorCodigo = async function(req, res) {
    console.log("Consultar topico");
    try {
        const TopicModelResult = await  TopicService.buscarPorCodigo(req.params.filtro|| '');
       // console.log("topic:",TopicModelResult);
        
        if(TopicModelResult){
            res.json({
                success : true,
                topic : TopicModelResult
            });
        }else{
            res.json({
                success : true,
                topico : [] 
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

const actualizar = async function(req, res) {
    console.log("actualizar topicos");

    let topicoRetorno = null;
    try {
        topicoRetorno = await TopicService.actualizar(req.body.id, 
                                                        req.body.create_date,
                                                        req.body.name, 
                                                        req.body.topic_id, 
                                                        req.body.order, 
                                                        req.body.priority, 
                                                        req.body.color, 
                                                        req.body.owner_user_id);
        res.json({
            success : true,
            topico : topicoRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar topico");
    try{
        await TopicService.eliminarServ(req.params.id);
        res.json({
            success : true
        });
        console.log("Eliminado el topico nro: ",req.params.id);
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};