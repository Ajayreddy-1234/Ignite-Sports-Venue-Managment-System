const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 8080;
var app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(
    express.static(path.resolve(__dirname, '../venuemanagement/build')));

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../venuemanagement/build', 'index.html'));
    });

const {registerUser, loginUser} = require('./functions/authFunctions')
const authenticate = require('./middleware/authMiddleware');
const {generatePasswordResetToken, sendPasswordResetEmail, resetPassword} = require('./functions/passwordReset');
const createVenue = require('./functions/createVenue');
const openCloseVenue = require('./functions/openCloseVenue');

// change this according to the request you make for form parsing use: 
// app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 

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
    res.json({message:"You are at home page!"})
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
        
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).json({user:user});

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

  try {
    await createVenue(venueData);
    console.log('Venue added successfully.');
    return res.status(200).json({ message: 'Venue added successfully' });
  } catch (error) {
    console.error('Error adding venue:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/venues/:venue_id/status', async (req, res) => {
  const venueId = req.params.venue_id;
  const newStatus = req.body.status;

  try {
    await openCloseVenue(venueId, newStatus);
    res.status(200).json({ message: 'Venue status updated successfully' });
  } catch (error) {
    console.error('Error updating venue status:', error);
    res.status(500).json({ error: 'Failed to update venue status' });
  }
});

module.exports = app;