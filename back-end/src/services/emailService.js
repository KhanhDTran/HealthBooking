import doten from "dotenv";
doten.config();

import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: "Booking Health",
  port: 587,
  service: "Gmail",
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  // send mail with defined transport object
}

export async function sendVerifyCode(data) {
  let info = await transporter.sendMail({
    from: `"Booking Health 👻" <${process.env.EMAIL_APP_USERNAME}>`, // sender address
    to: `${data.email}`, // list of receivers
    subject: "Verification of booking appointment Health Booking", // Subject line
    text: `Dear ${data.firstName} ${data.lastName}`, // plain text body
    html: `<span>This is a verification code for booking appointment </span>  <br />
    <p>Your code is: ${data.token} </p>  <br />
    <span>If you did not book appointment. Just ignore this. </span>  <br />
    <span>Thanh you for using Health Booking</span>  <br />
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
