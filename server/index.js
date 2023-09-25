const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8080;
var app = express();

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