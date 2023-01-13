var express = require("express");
var app = express();
var cors = require("cors");
const fileUpload = require("express-fileupload");
var porta = 3002;
const path = require("path");

var { produto } = require("./models")
var { vendedor } = require("./models")
var { cliente } = require("./models")
var { comprovante } = require("./models")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.get("/", (req, res) => res.type('html').send(html));

app.get("/produtos", async function (req, res){
  const mostrar = await produto.findAll()
  res.json(mostrar)
})

app.get("/produto/img/:id", async function (req,res){
  var pegar = await produto.findOne({ where: { id: req.params.id } });
  file = __dirname + "/uploads/" + pegar.img + ".png";
  res.sendFile(file);

})

app.post("/produto", async function (req, res){
        var adicionar = await produto.create(req.body);
        res.json(adicionar);
    
        const files = req.files.imageFile;
        files.name = req.body.img + ".png";
        const uploadPath = __dirname + "/uploads/" + files.name;
    
        files.mv(uploadPath);      
})


var html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Banco de dados</h1>
</body>
</html>`

  app.listen(porta, function () {
    console.log("O servidor está rodando na porta http://localhost:"+ porta);
  });
  
