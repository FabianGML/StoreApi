const nodemailer = require("nodemailer");

const { config } = require('./../config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
        user: config.nodeMail,
        pass: config.mailPass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.nodeMail, // sender address
    to: "caroline.hills92@ethereal.email", // list of receivers
    subject: "Mail Test", // Subject line
    text: "Hello world! from Node", // plain text body
    html: "<b>Hello World! from Node</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
