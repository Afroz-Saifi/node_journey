const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, 'public')
// app.use(express.static(publicPath))
app.get('', (req, res) => {
    res.sendFile(`${publicPath}/index.html`)
})
app.get('./mycart', (req, res) => {
    res.sendFile(`${publicPath}/cart.html`)
})
app.get('/shop', (req, res) => {
    res.sendFile(`${publicPath}/product.html`)
})
app.get('/admin', (req, res) => {
    res.sendFile(`${publicPath}/admin.html`)
})
app.get('*', (req, res) => {
    res.send(`404 Page not found`)
})
app.listen(1100)