 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')

 app.use(bodyParser.json())

 const mongoose = require("mongoose")
 require("./Book")
 const Book = mongoose.model("Book")

 mongoose.connect("mongodb+srv://microservices:microservices@cluster0.sgumq.mongodb.net/bookservice?retryWrites=true&w=majority",()=> {console.log("database is connected")})

 app.get('/', (req, res) => {
     res.send("this is out main endpoint")
 })

 //create funtionallity
app.post('/book', (req, res) => {

    var newBook = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        publisher: req.body.publisher
    }
    //creates a new book
    var book =new Book(newBook)

    book.save().then(() => {
        console.log("new book created")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
    res.send("A new book was created.")

})

// list of all books in the data base.


app.get('/books', (req, res) => {
    Book.find().then((books)=>{
        res.json(books)
    })
    .catch(err => {
        if(err){
            throw err;
        }
    })
})

//api route for inidividual books based on id
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book)=>{

        if (book){
            res.json(book)
        }else{
            res.sendStatus(404)
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


    app.delete('/book/:id', (req, res) => {

        Book.findByIdAndRemove(req.params.id).then(()=>{
            res.send("Book was removed successefully")

        }).catch(err => {
            if(err){
                throw err
            }
        })
    })


 app.listen (4545, ()=> {
     console.log("Book service is running on http://localhost:4545")
 })

