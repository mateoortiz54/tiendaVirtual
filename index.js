const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const enrutador = require('./routes/routes');
const { default: mongoose } = require('mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages/'));



app.listen(conex= process.env.PORT || 9000, () => {
    console.log("iniciando en el puerto: ", conex)
})
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', enrutador);
app.use(cookieParser());
//app.use('/static', express.static(__dirname, 'public/'))


