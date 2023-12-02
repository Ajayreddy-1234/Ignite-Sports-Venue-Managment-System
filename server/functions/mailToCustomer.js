const db = require('../database');
const nodemailer = require('nodemailer');

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.ENV_MAIL_USER, 
      pass: process.env.ENV_MAIL_PASS, 
    },
});

async function mailToCustomer(reservation, owner, customerEmail){
    try{
        const mailOptions = {
            from: process.env.ENV_MAIL_USER, 
            to: customerEmail, 
            subject: `Booking Confirmed at Ignite!`,
            html: `
              <p>You have booked the venue/activity - ${reservation.vname}.</p>
              <p>You can accomodate ${reservation.total_capacity} people for your reservation.</p>
              <p>Please find below the timings of your booking:</p>
              <p>StartTime: ${reservation.start_datetime} EndTime: ${reservation.end_datetime}</p>
              <p>For any further queries you can contact the owner - ${owner.username} at ${owner.email}</p>
            `,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending Reservation mail to customer', error);
        } else {
            console.log('successfully sent Reservation mail to customer', info.response);
        }
        });
        
    }catch(error){
        console.log(error)
    }
}



module.exports = {
    mailToCustomer,
};