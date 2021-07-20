const express = require('express')
const path = require("path")
const app = express()

require("./db/conn")

const Addaccount = require("./models/addaccount")
const Addproduct = require("./models/addproduct")
const Order = require("./models/orderproduct")
const { error } = require('console')

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs")

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/Owner', (req,res) => {
    res.render("Owner")
})

app.get('/Addaccount', (req,res) => {
    res.render("addaccount")
})

app.get('/Addproduct', (req,res) => {
    res.render("addproduct")
})

app.get('/Customer', (req,res) => {
    res.render('Customer')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/orderproduct', (req,res) => {
    res.render('orderproduct')
})

app.get('/BrowseProducts', async (req,res) => {
    try {
      const results = await Addproduct.find({}, {__v: 0})  
      res.send(results)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

app.get('/vieworder', async (req,res) => {
    try {
      const results = await Order.find({}, {__v: 0})  
      res.send(results)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


app.post("/addaccount", async(req,res) =>{
    try{
        const addEmployee = new Addaccount ({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
        })       
        console.log(addEmployee)
        const usered = await addEmployee.save()
        res.status(201).send("account create")
    }catch(err){
        res.status(404).send("email can not be duplicate")
        console.log("data can't store")
    }
})

app.post("/addproduct", async(req,res) =>{
        const addproduct = new Addproduct ({
            name: req.body.name,
            price:req.body.price,
            // url:req.body.url,
            // description:req.body.description,
        })       
        console.log(addproduct)
        const usered = await addproduct.save()
        res.status(201).send("product add suucessfully")

})

app.post("/login", async(req, res) =>{
    try {
         
             const email = req.body.email;
             const password = req.body.password;
     
             const useremail = await Addaccount.findOne({email:email});
            
             if(useremail.password === password){
                res.send(useremail)
                console.log(useremail);
             }else{
                res.send("invalid Password Details"); 
             }
         
        } catch (error) {
            res.status(400).send("invalid login Details")
        }
})

app.post("/orderproduct", async(req, res) =>{
    try {
         
             const name = req.body.name;
             const price = req.body.price;
     
             const username = await Addproduct.findOne({name:name});
            
             if(username.price === price){
                const createorders = new Order ({
                    name: req.body.name,
                    price:req.body.price,
                })
                res.send("order succesfull placed")
                
                console.log("order succesfull placed")
                const usered = await createorders.save()
             }else{
                res.send("invalid order Details"); 
             }
         
        } catch (error) {
            res.status(400).send(error)
            console.log(error)
        }
})

app.listen('3000', () =>{
    console.log("i am connect")
})