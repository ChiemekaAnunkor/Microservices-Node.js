const express = require('express');
const app= express();
const bodyParser = require("body-parser")

// allows use to get json data
app.use(bodyParser.json())

//connect to db
const mongoose = require ("mongoose")

 mongoose.connect("mongodb+srv://microservices:microservices@cluster0.sgumq.mongodb.net/bookservice?retryWrites=true&w=majority",()=> {console.log("database is connected- customers service")})

//  load our bd
require("./Customer")
const Customer = mongoose.model("Customer")

    app.get('/', (req, res) => {
        res.send("this is out main endpoint")
    })
    app.post('/customer', (req,res) =>{

        var newCustomer = {
            name:req.body.name,
            age:req.body.age,
            address:req.body.address
        }

        var customer = new Customer(newCustomer)
        
        customer.save().then(()=>{
            console.log("A Customer was Created ")
        }).catch((err)=>{
            if(err){
                throw err
            }
        })
        res.send("A Customer was Created ")

    })

    app.get('/customers', (req, res) => {
        Customer.find().then((customers) =>{
            res.json(customers)
        }).catch((err)=>{
            if(err){
                throw err
            }
        })
      
    })

    app.get('/customer/:id', (req,res)=>{
        Customer.findById(req.params.id).then((customer)=>{
            if(customer){
                res.json(customer)
            }else {
                res.send("invalid ID!")
            }
        }).catch((err)=>{
            if(err){
                throw err
            }
        })
    })

    app.delete('/customer/:id', (req, res) => {

        Book.findByIdAndRemove(req.params.id).then(()=>{
            res.send("customer was removed successefully")

        }).catch(err => {
            if(err){
                throw err
            }
        })
    })

app.listen(5555, ()=> {
    console.log("Customer services is running on http://localhost:5555 ")
})