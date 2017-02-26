var express = require('express');
var morgan = require('morgan');

var PORT = process.env.PORT || 3000;

// create express app
var app = express();

// logger
var logs = morgan('combined');

// use nice logs
app.use(logs);

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// export express app
module.exports = app;