const express = require('express')

const app = express()

const ageAuth = (req, res, next) => {
    if(req.query.age){
        if(req.query.age < 18){
            res.send("bde to ho jao pehle")
        }else{
            res.send("Aao gi aao")
        }
    }else{
        next()
    }
}

// using ageAuth middleware globaly
// app.use(ageAuth)

app.get('/', (req, res) => {
    res.send("this is the home page")
})

// ageAuth middleware only being used in this route only
app.get('/users', ageAuth, (req, res) => {
    res.send("this is the users page")
})


app.listen(1212)