const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_MAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOption = {
        from: process.env.EMAIL_MAIL,
        to: option.email,
        subject: option.subject,
        html: option.text
    };
    try {
        await transporter.sendMail(mailOption);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }

};

module.exports = sendEmail;