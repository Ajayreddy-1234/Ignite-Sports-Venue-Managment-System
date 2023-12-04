const bcrypt = require('bcrypt');
const db = require('../database');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.ENV_MAIL_USER,
        pass: process.env.ENV_MAIL_PASS,
    },
});
function mailToCustomer(reservation, owner, userEmail){
    const mailOptions ={
        from: process.env.ENV_MAIL_USER,
        to: userEmail,
        subject: 'Reservation Confirmation',
        html: `
        <p> Confirming your reservation at ${reservation["vname"]} 
        <p> if you have any questions about the reservation you can email ${owner["email"]}
        `,
    };
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.error('Error sending confirmation email:', error);
        } else{
            console.log('Confirmation email sent', info.response);
        }
    });
}
module.exports = {
    mailToCustomer
};