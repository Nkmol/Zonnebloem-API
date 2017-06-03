let config = require('../config/mail.config');
let nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.user,
                pass: config.pass
            }
        })
    }

    sendMail(to, subject, message, html) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: config.user,
                to: to,
                subject: subject,
                text: message,
                html: html
            }
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                resolve(info);
            })
        })
    }

}

module.exports = new MailService();