const path = require('path');
const express = require("express");
const session = require('express-session');
var passport = require('passport');
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
var app = express();
app.use(cors());

require('dotenv').config()
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(session({
  secret: process.env.ENV_SESSION_KEY, 
  resave: false,
  saveUninitialized: true
}));

app.use(
    express.static(path.resolve(__dirname, '../venuemanagement/build')));

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../venuemanagement/build', 'index.html'));
    });

const {registerUser, loginUser} = require('./functions/authFunctions')
const authenticate = require('./middleware/authMiddleware');
const {generatePasswordResetToken, sendPasswordResetEmail, resetPassword} = require('./functions/passwordReset');
const createVenue = require('./functions/createVenue');
const changeCapacity = require('./functions/openCloseVenue');
const {twoFactoredMail, verifyTwoFactored} = require('./functions/twoFactoredAuth')
const {inviteFriend} = require('./functions/inviteFriends')

// change this according to the request you make for form parsing use: 
// app.use(express.urlencoded({ extended: true }));

const {oauthTokenize} = require('./functions/authenticateOauth');
app.use(express.json()); 
// app.use(passport.initialize())
// app.use(passport.session());
// app.get('/google', passport.authenticate('google',{scope:['profile', 'email'], successRedirect: '/'}));
// app.get('/oauth/google',passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/'}), async (req,res)=>{
//   email = req.user._json.email;
//   const {token,user} = await oauthTokenize({email});
//   res.header('Authorization', `Bearer ${token}`);
//   res.status(200).json({user:user, token: token});
// });
app.post('/api/oauth', async (req, res) => {
  try {
    const email = req.body.email;
    const {token,user} = await oauthTokenize({email});
    res.header('Authorization', `Bearer ${token}`);
    res.status(200).json({user:user, authorization: token});
  } catch (error) {
    console.error('Oauth error:', error);
    res.status(500).json({ error: 'Oauth failed' });
  }
});
// (req, res) => {
//     email = req.user._json.email;
//     const {token,user} = oauthTokenize({email});
//     res.header('Authorization', `Bearer ${token}`);
//     res.status(200).json({user:user, token: token});
//     return res.redirect('/');
  // })
// }
// app.get('/oauth/google',passport.authenticate('google', { failureRedirect: '/login'}), async (req,res)=>{
//   email = req.user._json.email;
//   const {token,user} = await oauthTokenize({email});
//   res.header('Authorization', `Bearer ${token}`);
//   res.status(200).json({user:user, token: token});
// });
const db = require('./database')

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      throw err;
    }
    console.log('Connected to MySQL database');
});


const usersRoutes = require('./routes/userRoutes');


app.get('/', (req,res) => {
    res.json({message:"You are at home page!"});
});

app.use('/api/user', authenticate, usersRoutes);

// Registration route
app.post('/api/register', async (req, res) => {
    
    try {
      const { username, email, password, role } = req.body;
      const {token, registeredUser} = await registerUser({ username, email, password, role });
    //   console.log(token)
    //   console.log(registeredUser)
      res.header('Authorization', `Bearer ${token}`);
      res.status(201).json({user: registeredUser, msg: "Registration Successful"});

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });

    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const {token, user} = await loginUser({ username, password });
  
      if (token) {
        if(user.two_factor_enabled===1){
           email = user.email; 
           console.log(email);
           await twoFactoredMail({email})
        }
        const [result] = await db.promise().query('SELECT * FROM ignite.User WHERE username = ? ',[user.username]);
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({user:result[0], authorization:token});

      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/forgot-password',async (req,res)=>{
    try{
        const {email} = req.body;
        const passwordResetToken = await generatePasswordResetToken({email});
        if (passwordResetToken == null){
            res.status(500).json({msg: "No user Exists with this email"});
        }else{
            const passwordResetLink = req.protocol + '://' + req.get('host') + "/reset-password?token="+passwordResetToken;
            sendPasswordResetEmail(email, passwordResetLink);

            res.status(200).json({ message: 'Password reset email sent' });
        }

    }catch(error){
        res.status(500).json({msg:'internal server error'});
    }

});

app.post('/api/reset-password',async (req,res)=>{
    try{
       const {token} = req.query;
       const {password} = req.body;
       if (!token) {
        return res.status(400).json({ msg: 'Token is missing in query parameters' });
       }
       if(!password){
        return res.status(400).json({msg : 'Password is empty'});
       }
       
       if(!resetPassword({token, password})){
        res.status(400).json({msg:'Password reset failed'});
       }
        res.status(200).json({msg:'Password reset successful'});
       
    }catch(error){
        res.status(500).json({msg:'internal server error'});
    }
});

app.post('/api/venues', async (req, res) => {
  const venueData = req.body;
  console.log(venueData);
  try {
    await createVenue(venueData);
    console.log('Venue added successfully.');
    console.log(JSON.stringify(venueData));
    return res.status(200).json({ message: 'Venue added successfully' });
  } catch (error) {
    console.error('Error adding venue:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/venues/:venue_id/status', async (req, res) => {
  const newStatus = req.body;
  try {
    await changeCapacity(newStatus);
    res.status(200).json({ message: 'Venue status updated successfully' });
  } catch (error) {
    console.error('Error updating venue status:', error);
    res.status(500).json({ error: 'Failed to update venue status' });
  }
});

app.post('/api/2fa/setup',authenticate,async (req, res)=>{
  try{
    const [result] = await db.promise().query('SELECT * FROM ignite.User WHERE username = ? ',[req.user.username]);
    if(result.length == 0){
      res.status(400).json({message: 'No user Found with this email'});
    } else if(result[0].two_factor_enabled==1){
      res.status(200).json({message:'Two factored is already turned on'});
    }else{
      await db.promise().query('update ignite.User SET two_factor_enabled = ? where user_id = ?',[1,result[0].user_id]);

      res.status(200).json({ message: 'Successfully turned on two factored authentication' });
    }

  }catch(error){
      console.log(error)
      res.status(500).json({msg:'internal server error'});
  }

});

app.post('/api/2fa/verify',async (req, res)=>{
  try{
    const {Otp, email} = req.body;
    const x = await verifyTwoFactored({Otp, email});
    if(x==1){
      const [rex] = await db.promise().query('SELECT * FROM ignite.User where email = ?',[email]);
      const token = req.headers.authorization?.split(' ')[1];
      if(!token){
        return res.status(401).json({ message: 'Please send authorization header' });
      }else{
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).json(rex[0]);
      }
    }else{
      res.status(400).json({message: 'Wrong OTP entered'});
    }

  }catch(error){
    res.status(400).json({message:'internal server error'});
  }

});

app.post('/api/captcha',async (req, res)=>{
  const { token } = req.body;

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      res.send("Human 👨 👩");
    } else {
      res.send("Robot 🤖");
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
   }

});

app.post('/api/venueList', async (req, res)=>{
  try{
   const [results] = await db.promise().query('SELECT * FROM ignite.venue');
   res.status(200).json(results);
  }
  catch(error){
    res.status(400).json({message:'internal server error'});
  }
});

app.post('/api/2fa/setup',authenticate,async (req, res)=>{
  try{
    const [result] = await db.promise().query('SELECT * FROM ignite.User WHERE username = ? ',[req.user.username]);
    if(result.length == 0){
      res.status(400).json({message: 'No user Found with this email'});
    } else if(result[0].two_factor_enabled==1){
      res.status(200).json({message:'Two factored is already turned on'});
    }else{
      await db.promise().query('update ignite.User SET two_factor_enabled = ? where user_id = ?',[1,result[0].user_id]);

      res.status(200).json({ message: 'Successfully turned on two factored authentication' });
    }

  }catch(error){
      console.log(error)
      res.status(500).json({msg:'internal server error'});
  }

});

app.post('/api/2fa/verify',async (req, res)=>{
  try{
    const {Otp, email} = req.body;
    const x = await verifyTwoFactored({Otp, email});
    if(x===1){
      const [rex] = await db.promise().query('SELECT * FROM ignite.User where email = ?',[email]);
      const token = req.headers.authorization?.split(' ')[1];
      if(!token){
        return res.status(401).json({ message: 'Please send authorization header' });
      }else{
        res.status(200).json({user:rex[0], authorization:token});
      }
    }else{
      res.status(400).json({message: 'Wrong OTP entered'});
    }

  }catch(error){
    res.status(400).json({message:'internal server error'});
  }

});

app.put('/api/venues', async (req, res)=>{
   try{
    const updatedVenue = req.body;
    await db.promise().query(
      'UPDATE ignite.venues SET reservation_type = ?, vname = ?, address = ?, total_cost = ?, total_capacity = ?, sport = ?, user_id = ? WHERE venue_id = ?',
      [updatedVenue.reservation_type, updatedVenue.vname, updatedVenue.address, updatedVenue.total_cost, 
        updatedVenue.total_capacity, updatedVenue.sport, updatedVenue.user_id, updatedVenue.venue_id]);

    res.status(200).json(updatedVenue);
   }catch(error){
     res.status(400).json({message:'internal server error'});
   }
});

app.post('/api/reservations', async (req, res)=>{
  try{
    var {sorting, venue, dateTime} = req.body;

    const defaultSorting = 0;
    const defaultVenue = 'ALL';

    const usedSorting = sorting === undefined ? defaultSorting : sorting;
    const usedVenue = venue === undefined ? defaultVenue : venue;

    if(dateTime === undefined){
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; 
      const day = currentDate.getDate();

      // Format the date as "YYYY-MM-DD" to match the SQL DATE data type
      dateTime = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}T00:00`;
    }
    const reservationsQuery = `SELECT * FROM ignite.reservation WHERE start_datetime >= ?${
      usedVenue === 'ALL' ? '' : ' AND venue LIKE ?'
    } ORDER BY venue_id ASC`;
    
    const venuePattern = usedVenue === 'ALL' ? '%' : `%${usedVenue}%`;

    const queryParams = usedVenue === 'ALL' ? [dateTime] : [dateTime, venuePattern];
    const [reservations] = await db.promise().query(reservationsQuery, queryParams);

    const venueIds = [];
    const sqlQueries = [];
    for(var i=0;i<reservations.length;i++){
      const venueId = reservations[i].venue_id;
      const query = `SELECT * FROM ignite.venue WHERE venue_id = ${venueId}`;
      sqlQueries.push(query);
      venueIds.push(venueId);
    }
    const venuesQuery = sqlQueries.join(' UNION ALL ');
    const [venuesList] = await db.promise().query(venuesQuery);

    var finalData = venuesList.map((item,index)=>({...item, ...reservations[index]}));
    if(usedSorting == 1){
      finalData.sort((a,b)=> new Date(b.start_datetime) - new Date(a.start_datetime))
    }else{
      finalData.sort((a,b)=> new Date(a.start_datetime) - new Date(b.start_datetime))
    }   
    console.log(finalData);
    res.status(200).json(finalData);
  }catch(error){
    console.log(error);
    res.status(500).json({message:'internal server error'});
  }
});
app.post('/api/captcha',async (req, res)=>{
  const { token } = req.body;

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      res.send("Human 👨 👩");
    } else {
      res.send("Robot 🤖");
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
   }

});

app.post('/api/venueList', async (req, res)=>{
  try{
   const [results] = await db.promise().query('SELECT * FROM ignite.venue');
   res.status(200).json(results);
  }catch(error){
    res.status(400).json({message:'internal server error'});
  }
});

app.post('/api/inviteFriend', authenticate, async (req, res) => {
  try{
   const {friendEmail} = req.body;
   const name = req.user.username;
   await inviteFriend(name, friendEmail);
   res.status(200).json({message: 'Successfully invited your friend!'});
  }catch(error){
    res.status(400).json({message:'internal server error'});
  }

})

app.post('/api/bookVenue', authenticate, async (req, res) =>{
  try{
    const { reservation_id, paid } = req.body;
    const user_id = req.user.user_id;
    await db.promise().query('UPDATE ignite.reservation SET closed = 1 where reservation_id = ?',[reservation_id]);
    await db.promise().query('INSERT INTO ignite.reservation_user_rel (user_id, reservation_id, value_paid) VALUES (?, ?, ?)',[user_id, reservation_id, paid]);
    const [reservation_res] = await db.promise().query('SELECT * FROM ignite.reservation where reservation_id = ?',[reservation_id]);
    res.status(200).json({message: 'successfully booked the venue', reservation: reservation_res[0]})
  }catch(error){
    console.log(error);
    res.status(400).json({message:'internal server error', err: error});
  }

});
module.exports = app;