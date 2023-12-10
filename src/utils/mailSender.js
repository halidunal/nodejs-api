const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    )

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        }
        return true
    })
}

module.exports = sendEmail