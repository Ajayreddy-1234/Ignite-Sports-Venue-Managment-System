const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8080;
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.use(
    express.static(path.resolve(__dirname, '../venuemanagement/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello word for backend!" });
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../venuemanagement/build', 'index.html'));
});
module.exports = app;