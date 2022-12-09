const dotenv = require("dotenv").config({ path: "../../.env" });
const nodemailer = require('nodemailer');

const sendMail = async(email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_SERVICE,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
        let mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: subject,
            text: text
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Mail Gönderildi : ' + data.response);
            }
        });
    } catch (error) {
        console.log('Mail Gönderilirken Hata Oluştu! ' + error);
    }
}

module.exports = sendMail;