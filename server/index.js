const path = require('path');
const express = require("express");
const session = require('express-session');
var passport = require('passport');
const PORT = process.env.PORT || 8080;
var app = express();

require('dotenv').config()
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(session({
  secret: process.env.ENV_SESSION_KEY, 
  resave: false,
  saveUninitialized: true
}));

// app.use(
//     express.static(path.resolve(__dirname, '../venuemanagement/build')));

// app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../venuemanagement/build', 'index.html'));
//     });

const {registerUser, loginUser} = require('./functions/authFunctions')
const authenticate = require('./middleware/authMiddleware');
const {generatePasswordResetToken, sendPasswordResetEmail, resetPassword} = require('./functions/passwordReset')
const {twoFactoredMail, verifyTwoFactored} = require('./functions/twoFactoredAuth')

// change this according to the request you make for form parsing use: 
// app.use(express.urlencoded({ extended: true }));

const {oauthTokenize} = require('./functions/authenticateOauth');
app.use(express.json()); 
app.use(passport.initialize())
app.use(passport.session());
app.get('/google', passport.authenticate('google',{scope:['profile', 'email']}));
app.get('/oauth/google',passport.authenticate('google', { failureRedirect: '/login' }), async (req,res)=>{
  email = req.user._json.email;
  const {token,user} = await oauthTokenize({email});
  res.header('Authorization', `Bearer ${token}`);
  res.status(200).json({user:user, token: token});
})
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
        if(user.two_factor_enabled==1){
           email = user.email; 
           await twoFactoredMail({email})
        }
        const [result] = await db.promise().query('SELECT * FROM ignite.User WHERE username = ? ',[user.username]);
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).json({user:result[0]});

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

app.put('/api/venues', async (req, res)=>{
   try{
    const updatedVenue = req.body;
    await db.promise().query(
      'UPDATE ignite.venues SET sport_name = ?, venue_name = ?, location = ?, reservation_type = ?, address = ?, status = ?, dates = ?, times = ? WHERE venue_id = ?',
      [updatedVenue.sport_name, updatedVenue.venue_name, updatedVenue.location, updatedVenue.reservation_type, 
        updatedVenue.address, updatedVenue.status, updatedVenue.dates, updatedVenue.times, updatedVenue.venue_id]);

    res.status(200).json(updatedVenue);
   }catch(error){
     res.status(400).json({message:'internal server error'});
   }
});

app.post('/api/reservations', async (req, res)=>{
  try{
    var {sorting, venue, date} = req.body;

    const defaultSorting = 0;
    const defaultVenue = 'ALL';

    const usedSorting = sorting === undefined ? defaultSorting : sorting;
    const usedVenue = venue === undefined ? defaultVenue : venue;

    if(date === undefined){
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; 
      const day = currentDate.getDate();

      // Format the date as "YYYY-MM-DD" to match the SQL DATE data type
      date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }
    const reservationsQuery = `SELECT * FROM ignite.reservations WHERE reservation_date >= ?${
      usedVenue === 'ALL' ? '' : ' AND venue LIKE ?'
    }`;
    
    const venuePattern = usedVenue === 'ALL' ? '%' : `%${usedVenue}%`;

    const queryParams = usedVenue === 'ALL' ? [date] : [date, venuePattern];
    const [reservations] = await db.promise().query(reservationsQuery, queryParams);
    console.log(reservations)

    const venueIds = [];
    for(var i=0;i<reservations.length;i++){
      venueIds.push(reservations[i].venue_id);
    }
    const venuesQuery = `SELECT * FROM ignite.venues WHERE venue_id IN (?) AND status = ? ORDER BY dates ${usedSorting < 1 ? 'ASC' : 'DESC'}`;
    const [venuesList] = await db.promise().query(venuesQuery,[venueIds,'Open']);
    
    res.status(200).json(venuesList);
  }catch(error){
    console.log(error);
    res.status(500).json({message:'internal server error'});
  }
});
module.exports = app;