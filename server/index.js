var express = require("express");

var app = express();
const {registerUser, loginUser} = require('./functions/authFunctions')
const authenticate = require('./middleware/authMiddleware');
const {generatePasswordResetToken, sendPasswordResetEmail} = require('./functions/passwordReset')

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

app.post('/api/reset-password',(req,res)=>{
    try{
       
    }catch(error){
        res.status(500).json({msg:'internal server error'});
    }
});

module.exports = app;