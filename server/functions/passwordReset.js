const bcrypt = require('bcrypt');
const db = require('../database');
const nodemailer = require('nodemailer');

require('dotenv').config()

async function generatePasswordResetToken({email}){
    try{
        const [res] = await db.promise().query('SELECT * FROM ignite.User WHERE email = ? ',[email]);
        if(res.length == 0){
           throw new Error("No user Found with this email");
        }
        const dateTime = new Date();
        const newStringTokenize = email + dateTime.toString();
        const passwordResetToken = await bcrypt.hash(newStringTokenize, 10);
        await db.promise().query('INSERT INTO ignite.password_reset_token (user_id, token) VALUES ( ?, ?)',[res[0].user_id,passwordResetToken])
        return passwordResetToken;
    }catch(error){
        throw error;
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.ENV_MAIL_USER, 
      pass: process.env.ENV_MAIL_PASS, 
    },
});

function sendPasswordResetEmail(userEmail, resetLink) {
    const mailOptions = {
      from: process.env.ENV_MAIL_USER, 
      to: userEmail, 
      subject: 'Password Reset Request',
      html: `
        <p>You have requested to reset your password.</p>
        <p>Click the following link to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
      } else {
        console.log('Password reset email sent:', info.response);
      }
    });
  }

async function resetPassword({token,password}){
    try{
       const [rex] = await db.promise().query('SELECT * FROM ignite.password_reset_token where token = ?',[token]);
       if(rex.length == 0){
         throw new Error('Invalid Token') 
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       await db.promise().query('update ignite.User SET password_hash = ? where user_id = ?',[hashedPassword,rex[0].user_id]);
       await db.promise().query('DELETE FROM ignite.password_reset_token where user_id = ?',[rex[0].user_id]);
       
       return hashedPassword
       
    }catch(error){
        return null
    }
}
module.exports = {
    generatePasswordResetToken,
    sendPasswordResetEmail,
    resetPassword,
};