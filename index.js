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

app.delete("/produto/:id", async function (req,res){
  var apagar = await produto.destroy({ where: { id: req.params.id } });
  res.json(apagar);
})

//vendedores


app.get("/vendedores", async function (req, res){
  const mostrar = await vendedor.findAll()
  res.json(mostrar)
})

app.get("/vendedor/img/:id", async function (req,res){
  var pegar = await vendedor.findOne({ where: { id: req.params.id } });
  file = __dirname + "/uploadsvendedor/" + pegar.img + ".png";
  res.sendFile(file);

})

app.post("/vendedor", async function (req, res){
        var adicionar = await vendedor.create(req.body);
        res.json(adicionar);
    
        const files = req.files.imageFile;
        files.name = req.body.img + ".png";
        const uploadPath = __dirname + "/uploadsvendedor/" + files.name;
    
        files.mv(uploadPath);      
})

app.delete("/vendedor/:id", async function (req,res){
  var apagar = await vendedor.destroy({ where: { id: req.params.id } });
  res.json(apagar);
})

//cliente

app.get("/cliente", async function (req, res){
  const mostrar = await cliente.findAll()
  res.json(mostrar)
})

app.get("/cliente/img/:id", async function (req,res){
  var pegar = await cliente.findOne({ where: { id: req.params.id } });
  file = __dirname + "/uploadscliente/" + pegar.img + ".png";
  res.sendFile(file);

})

app.post("/cliente", async function (req, res){
        var adicionar = await cliente.create(req.body);
        res.json(adicionar);
    
        const files = req.files.imageFile;
        files.name = req.body.img + ".png";
        const uploadPath = __dirname + "/uploadscliente/" + files.name;
    
        files.mv(uploadPath);      
})


app.delete("/cliente/:id", async function (req,res){
  var apagar = await cliente.destroy({ where: { id: req.params.id } });
  res.json(apagar);
})

app.get("/cliente/:id/produto", async function(req, res){
  var produto = await comprovante.findOne({ include : ["vendedor", "produto"]} , {where : {clienteId : req.params.id}})
  res.json(produto)
})

app.get("/cliente/:id/totalgasto", async function(req, res){
  var gasto = await comprovante.sum('valor', { where: {clienteId: req.params.id}})
  res.json(gasto)
})

app.get("/cliente/:id/vendas", async function (req, res) {
  try {
    var mostrar = await cliente.findByPk(req.params.id, { include: ["comprovantes"] });
    res.json(mostrar);
  } catch (error) {
    res.status(500);
    res.json("Erro: " + error);
  }
});


//Comprovantes


app.get("/comprovantes", async function (req, res){
  var soma = await comprovante.sum('valor')
  const mostrar = await comprovante.findAll( {
    include: ["cliente", "produto", "vendedor"],
  })
console.log(soma)
  res.json(mostrar)
})

app.get("/comprovantes/:id", async function (req, res){
  const mostrar = await comprovante.findByPk(req.params.id, {
    include: ["cliente", "produto", "vendedor"],
  })

  res.json(mostrar)
})


app.get("/comprovante/img/:id", async function (req,res){
  var pegar = await comprovante.findOne({ where: { id: req.params.id } });
  file = __dirname + "/uploadscomprovante/" + pegar.img + ".pdf";
  res.download(file);

})

app.post("/comprovante", async function (req, res){
        var adicionar = await comprovante.create(req.body);
        res.json(adicionar);
    
        const files = req.files.imageFile;
        files.name = req.body.img + ".pdf";
        const uploadPath = __dirname + "/uploadscomprovante/" + files.name;
    
        files.mv(uploadPath);      
})


app.delete("/comprovante/:id", async function (req,res){
  var apagar = await comprovante.destroy({ where: { id: req.params.id } });
  res.json(apagar);
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
  
