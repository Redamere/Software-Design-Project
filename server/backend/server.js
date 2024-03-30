require("dotenv").config()

const mongoose = require("mongoose")
<<<<<<< HEAD
const router = require("./routes/QuoteForm")
//express app
=======

const express = require("express")
const quoteForm = require("./routes/signup")
const profileRoutes = require('./routes/profiles')

// express app
>>>>>>> origin/new-main
const app = express()

// middleware -- code that executes between getting a request and seding a response
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (Must use double quotes ("") instead of single quotes? (''))
app.use("/api/signup", quoteForm)
app.use('/api/profile', profileRoutes)

app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the homepage"})
})

// connect to db
mongoose.connect(process.env.MONGO_URI_SEAN)
    .then(() => {
        //listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Connected to Mongoose and Listening on port " + process.env.PORT)
             })
        })
    .catch((error) => {
        console.log(error)
    })

<<<<<<< HEAD



//test the get request @ localhost:4000/api/quoteForm

// router.get("/", (req, res) => {
//     res.json({mssg: "Testing Get Request"})
// }) 
=======
//listen for requests
// app.listen(process.env.PORT, () => {
//     console.log("Listening on port " + process.env.PORT)
// })
>>>>>>> origin/new-main
