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

async function cancelNotification(venue_name, email){
    try{
        const websiteUrl = process.env.WEBSITE_URL;
        const mailOptions = {
            from: process.env.ENV_MAIL_USER, 
            to: email, 
            subject: `Event Cancelled - ${venue_name}`,
            html: `
              <p>${venue_name} has been cancelled until further notice.</p>
              <p>You can book your venues for sports and register for exciting activites here.</p>
              <p>Please click the link below to visit our page:</p>
              <a href="${websiteUrl}">Ignite Sports Venue Management</a>
              <p>Excited to see you there!</p>
            `,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email', error);
        } else {
            console.log('successfully sent email', info.response);
        }
        });
        
    }catch(error){
        console.log(error)
    }
}
async function openedNotification(venue_name, email){
    try{
        const websiteUrl = process.env.WEBSITE_URL;
        const mailOptions = {
            from: process.env.ENV_MAIL_USER, 
            to: email, 
            subject: `Event Reopened - ${venue_name}`,
            html: `
              <p>${venue_name} has been reopened.</p>
              <p>You can book your venues for sports and register for exciting activites here.</p>
              <p>Please click the link below to visit our page:</p>
              <a href="${websiteUrl}">Ignite Sports Venue Management</a>
              <p>Excited to see you there!</p>
            `,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email', error);
        } else {
            console.log('successfully sent email', info.response);
        }
        });
        
    }catch(error){
        console.log(error)
    }
}



module.exports = {
    cancelNotification,
    openedNotification
};