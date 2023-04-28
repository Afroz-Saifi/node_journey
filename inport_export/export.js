// 1
module.exports = {
    fname: "Afroz",
    lname: "Saifi",
    getFullName: function(){
        return `${this.fname} ${this.lname}`
    }
}

let add = (a,b) => {
    return a+b;
}
let subtract = (a,b) => {
    return a-b;
}
let product = (a,b) => {
    return a*b;
}
let divide = (a,b) => {
    return a/b;
}

module.exports = add;
module.exports = subtract;
module.exports = product;
module.exports = divide;