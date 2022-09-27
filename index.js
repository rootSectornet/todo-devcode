const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path'); 
var cors = require('cors')
var app = express();
var shell = require('shelljs');

shell.exec('npm i -g sequelize-cli')
shell.exec('sequelize-cli db:migrate')

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, './public')));
const hostname = "0.0.0.0";
const port = 3030;
let Groups = require("./services/groups")
let Todos = require("./services/todo")


app.post("/activity-groups",(req,res)=>{
    Groups.create(req.body)
    .then((item)=>{
        res.status(200).send({status:"Success",data:item,message:"Success"})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,data:e.data,message:e.message})
    })
})

app.get("/activity-groups",(req,res)=>{
    Groups.items()
    .then((item)=>{
        res.status(200).send({status:"Success",data:item,message:"Success"})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,data:e.data,message:e.message})
    })
})
app.get("/activity-groups/:id",(req,res)=>{
    Groups.item(req.params)
    .then((item)=>{
        res.status(200).send({status:"Success",data:item,message:"Success"})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,data:e.data,message:e.message})
    })
})

app.patch("/activity-groups/:id",(req,res)=>{
    Groups.update(req.params,req.body)
    .then((item)=>{
        res.status(200).send({status:"Success",data:item,message:"Success"})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,data:e.data,message:e.message})
    })
})
app.delete("/activity-groups/:id",(req,res)=>{
    Groups.remove(req.params)
    .then((item)=>{
        res.status(200).send({status:"Success",data:{},message:"Success"})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,data:e.data,message:e.message})
    })
})



//todo
app.post("/todo-items",(req,res)=>{
    Todos.create(req.body)
    .then((item)=>{
        res.status(200).send({status:"Success",message:"Success",data:item})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,message:e.message,data:e.data})
    })
})

app.get("/todo-items",(req,res)=>{
    Todos.items(req.query)
    .then((item)=>{
        res.status(200).send({status:"Success",message:"Success",data:item})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,message:e.message,data:e.data})
    })
})

app.get("/todo-items/:id",(req,res)=>{
    Todos.item(req.params)
    .then((item)=>{
        res.status(200).send({status:"Success",message:"Success",data:item})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,message:e.message,data:e.data})
    })
})

app.patch("/todo-items/:id",(req,res)=>{
    Todos.update(req.params,req.body)
    .then((item)=>{
        res.status(200).send({status:"Success",message:"Success",data:item})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,message:e.message,data:e.data})
    })
})

app.delete("/todo-items/:id",(req,res)=>{
    Todos.remove(req.params)
    .then((item)=>{
        res.status(200).send({status:"Success",message:"Success",data:item})
    })
    .catch((e)=>{
        res.status(e.code).send({status:e.status,message:e.message,data:e.data})
    })
})


app.listen(port, () =>
  console.log(`Your port is ${hostname} ${port}`),
);




module.exports = app;