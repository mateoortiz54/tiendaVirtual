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
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', enrutador);
app.use(cookieParser());


app.get("/send", (req, res) => {
    res.cookie("loggedin", "true");
    res.send("Cookie sent!");
});

