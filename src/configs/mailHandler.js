import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
import nodemailer from "nodemailer";

if(!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST is not set");
}

if(!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not set");
}

export const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

// const brevo = require('@getbrevo/brevo');
// let defaultClient = brevo.ApiClient.instance;

// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = `xkeysib-${process.env.SMTP_KEY}`;

// let apiInstance = new brevo.TransactionalEmailsApi();
// let sendSmtpEmail = new brevo.SendSmtpEmail();

// sendSmtpEmail.subject = "My {{params.subject}}";
// sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
// sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
// sendSmtpEmail.to = [
//   { "email": "example@brevo.com", "name": "sample-name" }
// ];
// sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
// sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
// sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


// apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// }, function (error) {
//   console.error(error);
// });


