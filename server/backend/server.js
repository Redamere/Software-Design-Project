// require("dotenv").config()

// const quoteForm = require("./routes/QuoteForm")
// const quoteHistory = require("./routes/quoteHistory")
// const express = require("express")
// const mongoose = require("mongoose")
// const router = require("./routes/QuoteForm")
// const profileRoutes = require("./routes/profiles")
// const signup = require("./routes/signup")
// const login = require("./routes/login")


// //express app
// const app = express()

// // middleware -- code that executes between getting a request and seding a response
// app.use(express.json())

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// // routes (Must use double quotes ("") instead of single quotes? (''))
// app.use("/api/quoteForm", quoteForm)
// app.use('/api/profile', profileRoutes)
// app.use('/api/signup', signup)
// app.use('/api/login', login)

// app.get('/', (req, res) => {
//     res.json({mssg: "Welcome to the homepage"})
// })

// // connect to db
// mongoose.connect(process.env.MONGO_URI_SEAN)
//     .then(() => {
//         //listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log("Connected to Mongoose and Listening on port " + process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// //listen for requests
// // app.listen(process.env.PORT, () => {
// //     console.log("Listening on port " + process.env.PORT)
// // })
require("dotenv").config()

const mongoose = require("mongoose")

const express = require("express")
const quoteForm = require("./routes/quoteForm")
const profileRoutes = require('./routes/profiles')
const signup = require('./routes/signup')
const login = require('./routes/login')


// express app
const app = express()

// middleware -- code that executes between getting a request and seding a response
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (Must use double quotes ("") instead of single quotes? (''))
app.use("/api/quoteForm", quoteForm)
app.use('/api/profile', profileRoutes)
app.use('/api/signup', signup)
app.use('/api/login', login)

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

//listen for requests
// app.listen(process.env.PORT, () => {
//     console.log("Listening on port " + process.env.PORT)
// })