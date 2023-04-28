const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "thalia.tremblay@ethereal.email",
    pass: "NDkQs3uMMBDmT4wGZ7",
  },
});

transporter
  .sendMail({
    to: "thalia.tremblay@ethereal.email",
    from: "saifiAfroz@gmail.com",
    subject: "first emai form node.js",
    text: "hey this is the first email send via nodejs",
    html: '<h1>hello how you my boys</h1><a href="https://oopmark.netlify.app/">click here to visit </a>',
  })
  .then(() => {
    console.log("mail sent successfull");
  })
  .catch((err) => {
    console.log(err);
  });
