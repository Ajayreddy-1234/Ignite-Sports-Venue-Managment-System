var express = require("express");

var app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello word for backend!" });
});

module.exports = app;