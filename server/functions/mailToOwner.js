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
function mailToOwner(reservation, owner, userEmail){
    const mailOptions ={
        from: process.env.ENV_MAIL_USER,
        to: owner["email"],
        subject: 'Reservation',
        html: `
        <p> your venue ${reservation["vname"]} has been booked
        <p> By ${userEmail}
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
    mailToOwner
};
