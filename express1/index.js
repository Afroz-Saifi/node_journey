const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send(`
    <h1> This is the home page </h1>
    `)
})
app.get('/admin', (req, res) => {
    res.send(`
    <h1> This is the admin page </h1>
    <p> Welcome ${req.query.name}</p>
    `)
})
app.get('/product', (req, res) => {
    res.send(`
    <h1> This is the product page </h1>
    `)
})

app.listen(1200)