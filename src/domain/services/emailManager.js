import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { getTemplateSource } from "../../shared/index.js";

class EmailManager {
    constructor(){
        this.smtp_config = {
            service: 'gmail',
            //host: process.env.SMTP_HOST,
            //port: process.env.SMTP_PORT,
            secure: false,
            ignoreTLS: true,
            auth: {
                user:'alex.c18cr@gmail.com',
                pass: 'uzsuposstsqsdcxi',
            }
        }

        this.transporter = nodemailer.createTransport(this.smtp_config);
    }

    async send(data)
    {
        const { user, email,token,templatePath} = data

        const source = getTemplateSource( templatePath)
        const template = Handlebars.compile(source)
        const html = template({
            userName: user.charAt(0).toUpperCase() + user.slice(1).toLowerCase(),
            resetLink: `http://localhost:8080/api/session/reset-password/${token}`
        })

        const mailData= {
            from: '"From" <Ecomerce@node.com>',
            to: `${email}`,
            subject: `Cambio de contraseña`,
            html
        }

        return await this.transporter.sendMail(mailData);
    }
}

export default EmailManager;