const ageAuth = (req, res, next) => {
    if(req.query.age){
        if(req.query.age>18){
            res.send("You are eligible for this page")
        }else{
            res.send("You are not eligible for the page")
        }
    }else{
        next()
    }
}

module.exports = {ageAuth}