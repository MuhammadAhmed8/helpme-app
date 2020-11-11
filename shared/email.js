const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


class EmailService{

    mailSender;

    constructor(mailSender){
        this.mailSender = mailSender;
    }

    send(to,from,subject,body){
        return this.mailSender.send(to,from,subject,body);
    }


}

class NodeMailerSender{

    constructor(){

        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
                api_key : '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'
            }
        }));

        this.transporter = transporter;

    }

    send(to,from,subject,body){
        return this.transporter.sendMail({
            to: to,
            from: from,
            subject: subject,
            html: body,
        })
    }

}

exports.EmailService = EmailService;
exports.NodeMailerSender = NodeMailerSender;