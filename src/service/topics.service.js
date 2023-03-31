//const { json } = require("sequelize");
const { TopicModel } = require("../model/topics.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("listar topicos");
    try {
        const topics = await sequelize.query(`SELECT * 
                                            FROM topics 
                                            Where 1 = 1
                                                AND UPPER(name) LIKE UPPER('%${txtbuscar}%') 
                                            ORDER BY id`);
       // console.log("topicos: ",topics);
        if(topics && topics[0]){
            return topics[0];
        }else{
            return [];;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const buscarPorCodigo= async function(codigo) {
    console.log("Consultar topicos por codigo");
    try {
        const topicsModelResult = await TopicModel.findByPk(codigo);

        if(topicsModelResult){
            return topicsModelResult;
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topicos");

    let retorno = null;
    const data = {id, create_date, name, topic_id, order, priority, color, owner_user_id};
    
    try {
        let existe = null;
        if(id){
            existe = await TopicModel.findByPk(id);
        }
        if (existe) {
            //Confirma que existe y actualiza
            retorno = await TopicModel.update(data, { where : {id : id}});
            retorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("topico Service actualizado");
        } else {
            //agg sino
            retorno = await TopicModel.create(data);
            //console.log("Nuevo topico Service");
        }
        return retorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(codigo) {
    console.log("eliminar topicos");
    try{
        
         TopicModel.destroy({where: {id: codigo, topic_id: codigo}},{truncate:false});
        console.log("topico eliminado");
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};