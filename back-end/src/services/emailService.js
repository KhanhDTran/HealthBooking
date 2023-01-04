import doten from "dotenv";
import moment from "moment";
doten.config();

import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper

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

export async function sendEmailBookingDetail(data) {
  let info = await transporter.sendMail({
    from: `"Booking Health 👻" <${process.env.EMAIL_APP_USERNAME}>`, // sender address
    to: `${data.email}`, // list of receivers
    subject: "Booking appointment Health Booking", // Subject line
    text: `Dear ${data.firstName} ${data.lastName}`, // plain text body
    html: `<span>This is a detail information of booking appointment </span>  <br />
    <span>Doctor: ${data.doctor.position.value} ${
      data.doctor.user.firstName
    }  ${data.doctor.user.lastName} </span> <br />
    <span>Time: ${data.time.time.value} ${moment(data.time.date).format(
      "DD/MM/YYYY"
    )} </span>  <br />
    <span>Price: ${data.doctor.price.value} VNĐ </span>  <br />
    <span>Thanh you for using Health Booking</span>  <br />
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export async function sendVerifyCodeEmail(data) {
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
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
