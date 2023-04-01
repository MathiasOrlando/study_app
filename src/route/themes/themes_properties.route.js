const themes_PropertiesController = require('../../controller/themes/themes_properties.controller');

module.exports = function(app) {

    app.get("/themes_Properties/list", themes_PropertiesController.listar);
    app.get("/themes_Properties/:id", themes_PropertiesController.BuscarPorCodigo);
    app.post("/themes_Properties/update", themes_PropertiesController.actualizar);
    app.delete("/themes_Properties/delete/:id", themes_PropertiesController.eliminar);
    
}