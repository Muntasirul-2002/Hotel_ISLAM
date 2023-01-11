const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/booking", function (req, res) {
  const mail = req.body.email;
  const checkIN = req.body.checkin;
  const checkOut = req.body.checkout;

  async function sendEmail(to, subject, text, html) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "toheedjamaal9@gmail.com",
        pass: "rohlyfunxcxnxupy",
      },
    });

    let info = await transporter.sendMail({
      from: '"MST" <muntasirul.msd@gmail.com>',
      to: mail,
      subject: "BOOKING CONFIRMED",
      text:
        "Thank you for booking on our hotel. Your booking is confirmed from " +
        checkIN +
        " to " +
        checkOut +
        ".",
    });

    console.log("Message sent: %s", info.messageId);
  }

  res.redirect("/");
  console.log("db succes");
  sendEmail(req.body.email);
});

app.get("/booking", function (req, res) {
  res.render("booking");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
