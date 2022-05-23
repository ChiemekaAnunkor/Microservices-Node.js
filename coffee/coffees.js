const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://microservices:microservices@cluster0.sgumq.mongodb.net/bookservice?retryWrites=true&w=majority",()=> {console.log("database is connected")})

const { Schema } = mongoose;
const coffeeSchema = new Schema({
    roast: {type: String, required:true},
    price: {type: Number, required:true},
    size: {type: String, required:true}

})

const Coffee = mongoose.model('Coffee',coffeeSchema)

//mainpage

app.get("/", (req, res)=>{
    res.send("Main page here ")
})

 //create coffee with postman 
app.post("/coffee", (req,res)=>{
    var newCoffee ={
        roast:req.body.roast,
        price:req.body.price,
        size:req.body.size,
    }
    var  coffee = new Coffee(newCoffee)

    coffee.save().then((newCoffee) => {
        console.log("new Coffee was created")
    }).catch((err) => {
        if (err){
            throw err
        }
    });
    res.send("A new coffee was created")
})

//show all the coffee in the database on here
app.get("/coffees", (req,res)=>{

    Coffee.find().then((coffees)=>{
        res.json(coffees)
    }).catch(err=>{
        if (err){
            throw err
        }
    })
})

app.listen(9999, ()=>{
    console.log("Coffee services is loading on port  9999")
})
