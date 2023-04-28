const express = require('express')
const fs = require('fs');
const { send } = require('process');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("this is home page")
})
app.get('/phone', (req, res) => {
    const phoneData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    console.log(phoneData.phones);
    res.send("this is phone page")
})
app.post('/addPhone', (req, res) => {
    const phoneData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    phoneData.phones.push(req.body)
    fs.writeFileSync('db.json', JSON.stringify(phoneData))
    res.send("added new phone")
})
app.patch('/updatePhone', (req, res) => {
    const phoneData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let sendData = null;
    phoneData.phones.forEach(ele => {
        if(ele.model == req.query.model){
            ele.price = req.body.price
            sendData = ele
        }
    });
    fs.writeFileSync('db.json', JSON.stringify(phoneData))
    res.send(JSON.stringify(sendData))
})
app.delete('/delete', (req, res) => {
    const phoneData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let deletedData = null;
    let newData = phoneData.phones.filter(ele => {
        if(ele.model != req.query.model){
            return true;
        }else{
            deletedData = ele
        }
    })
    phoneData.phones = newData;
    fs.writeFileSync('db.json', JSON.stringify(phoneData))
    res.send(JSON.stringify(deletedData))
})

app.listen(1200)