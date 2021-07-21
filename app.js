const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
app.use(cors());
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jadson:111555tiago@cluster0.x6oaw.mongodb.net/lojavirtual?retryWrites=true&w=majority";
//mongodb+srv://jadson:<password>@cluster0.x6oaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
///mongodb+srv://jadson:<password>@cluster0.x6oaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const client = new MongoClient(uri, { useUnifiedTopology: true });
const porta=process.env.PORT||8001;
client.connect((err, client) => {
if (err) return console.log(err)
db = client.db('lojavirtual') 
app.listen(porta, () => console.log('ABRA SEU NAVEGADOR NO SEGUINTE ENDEREÇO =>   http://localhost:'+porta));
})


/////
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/////

app.get('/:categoria/:id/:page',async (req, res) => {
let categoria=req.params.categoria;
categoria=categoria.toUpperCase();    
let params=req.params.id;
params=params.toUpperCase();
let pagenation =req.params.page;
let tamanho=0; 
pagenation--;
let folha=pagenation*9;


if(categoria=="PESQUISA"){
//////



let title=req.params.id;
title=title.toUpperCase();    
let pagenation =req.params.page;
let tamanho=0; 
pagenation--;
let folha=pagenation*9;
db.collection('catalogo').find({}).count(function(err,res){
if(err){
res.send(400);
}else{
tamanho=res;
 next();
}});
function next(){
db.collection('catalogo').find({}).toArray((err, results) => {
if (err){ res.send(400);
}else{
let qtp=(tamanho/9);
qtp= Math.ceil(qtp); 
pagenation=pagenation+1;
res.json( { docs: results});
}})
}


























/////
}else{

db.collection('catalogo').find({'marca':{$regex:'.*'+params+'.*'},'categoria':{$regex:'.*'+categoria+'.*'}}).count(function(err,res){
if(err){
res.send(400);
}else{
tamanho=res;
 next();
}});
function next(){
db.collection('catalogo').find({'marca':{$regex:'.*'+params+'.*'},'categoria':{$regex:categoria}}).skip(folha).limit(9).toArray((err, results) => {
if (err){ res.send(400);
}else{
let qtp=(tamanho/9);
qtp= Math.ceil(qtp); 
pagenation=pagenation+1;
res.json( { docs: results ,total:tamanho,page:pagenation,pages:qtp });
}})
}

}
})


app.get('/listacliente',async (req, res) => {
    db.collection('CLIENTES').find({}).toArray((err, results) => {
        if (err){ res.send(400);
        }else{
            res.json(results);
        }})
    })


    
    

    app.post('/inserirProduto',async (req, res) => {
        let opciones =req.body.dados;
        opciones=opciones.replace(/#/g,'&');
        opciones=opciones.replace(/@/g,'/');
        opciones= JSON.parse(opciones);
        let codl=req.body.codigo;
        codl=Number(codl)
        let preco=req.body.preco;
        let marca=req.body.marca;
        let categoria=req.body.categoria;
        let codigo=opciones[0].cod;
        codigo=Number(codigo);
        let url =opciones[0].foto;

        const myobj = { title: "SANDÁLIA "+codl, description: preco,url:url,desc:0,__v:0,codigo:codigo,codl:codl,categoria:categoria,marca:marca,codicor:opciones };

        db.collection('catalogo').insertOne(myobj,(err, results) => {
            if (err){ res.send(400);
            }else{
                res.send('1');
            }})
            
      
       
            
      
        })




    app.post('/inserirCliente',async (req, res) => {
        const name =req.body.nome;
        const codigo=req.body.cod
        const telefone=req.body.tel;

        const myobj = { nome: name, codigo: codigo,tel:telefone };
        db.collection('CLIENTES').insertOne(myobj,(err, results) => {
            if (err){ res.send(400);
            }else{
                res.send('1');
            }})
      
        })


        app.post('/deletarCliente',async (req, res) => {
            const id =req.body.id;
            
            const myquery = { codigo: id };
        db.collection('CLIENTES').deleteOne(myquery,(err, results) => {
                if (err){ res.send(400);
                }else{
                    res.send('1');
        }})
        
        
        
        
        
        })    


        app.post('/deletarSandalia',async (req, res) => {
            let ci =req.body.ci;
            ci=Number(ci)
            const myquery = { codl: ci };
           
            db.collection('catalogo').deleteOne(myquery,(err, results) => {
                if (err){ res.send(400);
                }else{
                    res.send('1');
        }})
        
        
        
        })  











app.get('/product/:id',async (req, res) => {
const params=req.params.id;
const id = new require('mongodb').ObjectID(params);
db.collection('catalogo').findOne({'_id':id}).then(function(doc) {
if(!doc){
res.send(400);
}else{
res.json(doc);
}
});
})

app.get('/', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/index.html'))
  })


  app.get('/1', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/css/1.css'))
  })  

  app.get('/2', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/css/2.css'))
  })  
  app.get('/3', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/script/1.js'))
  })  

  app.get('/4', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/script/2.js'))
  })  

  app.get('/5', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/script/3.js'))
  })  

  app.get('/6', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/script/4.js'))
  })  



  app.get('/img/fundo', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/img/fundo.png'))
  })  

  app.get('/img/avatar', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/img/avatar.png'))
  })  



app.get('/verificar/:id',async(req,res)=>{
    const idcliente=req.params.id;
    db.collection('CLIENTES').findOne({'codigo':idcliente}).then(function(doc){


        if(!doc){
            res.send('{"_id":"0","nome":"0","codigo":"0","tel":"0"}');
            }else{
            res.json(doc);
            }


    })

})



app.get('/verificarProduto/:id',async(req,res)=>{
    let idproduto=req.params.id;
        idproduto=Number(idproduto) 
        
    db.collection('catalogo').findOne({'codl':idproduto}).then(function(doc){


        if(!doc){
            res.send('{"_id":"0","nome":"0","codigo":"0","tel":"0"}');
            }else{
            res.json(doc);
            }


    })

})