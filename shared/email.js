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
