require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
//express app
const app = express()

//middleware -- code that executes between getting a request and seding a response
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (Must use double quotes ("") instead of single quotes? (''))
app.get("/", (req, res) => {
    res.json({mssg: 'Welcome to the app' })
})

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Connected to Mongoose and Listening on port " + process.env.PORT)
             })
        })
    .catch((error) => {
        console.log(error)
    })
//listen for requests