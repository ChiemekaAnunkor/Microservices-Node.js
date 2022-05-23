const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose =  require("mongoose")

const axios = require("axios")
const { response } = require('express')

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://microservices:microservices@cluster0.sgumq.mongodb.net/bookservice?retryWrites=true&w=majority",()=> {console.log("database is connected- Orders service")})

require("./Order")
const Order = mongoose.model("Order")

app.get('/',(req, res)=>{
    res.send("This is ourmain endpoint")
})

app.post("/order", (req, res)=>{

    var newOrder = {
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        InitialDate:req.body.InitialDate,
        DeliveryDate:req.body.DeliveryDate

    }

    var order = new Order (newOrder)

    order.save().then(()=>{
        res.send("Order Created with success!")
    }).catch((err) => {
        if(err){
            throw err
        }

    })
})


app.get('/orders', (req, res)=>{

    Order.find().then((books)=>{
        res.send(books)
    }).catch((err)={
        if(err){
            throw err
        }
    })

})
//connects to our customers side and book side
app.get('/order/:id',(req, res)=>{

    Order.findById(req.params.id).then((order)=>{
        if(order){

            axios.get("http://localhost:5555/customer/"+ order.CustomerID).then((response)=>{

            var orderObject = {customerName: response.data.name, bookTitle: ''}

            axios.get("http://localhost:4545/book/"+ order.BookID).then((response)=>{

                orderObject.bookTitle = response.data.title
            
                res.json(orderObject)
                })
            })

        }else {
            res.send("Invalid Order")

        }
    })
})

app.listen(7777, ()=> {
    console.log("order services is listening on port http://localhost:7777 ")
})