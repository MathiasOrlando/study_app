//const { application } = require('express');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
//app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const userRoute=require('./src/route/users/users.route');
const themesRoute = require('./src/route/themes/themes.route');
const topicsRoute = require('./src/route/topics/topics.route');


//Ruta raiz
app.get('/', function (req, res) {
    //logica
  res.send('Al fin muestra algo XD');
});
app.get('/pagina2', function (req, res) {
    //logica
    //esta aqui -Controller
    res.json({application: 'Study APP', version: '1.0.0'});
  });
//llamadas a los routes de los UCs
userRoute(app);
themesRoute(app);
topicsRoute(app);
app.listen(3000);