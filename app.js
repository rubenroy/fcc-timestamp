var express = require('express');
var app = express();
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send("Index Page");
})

app.get('/:input', function (req, res) {
	input = req.params.input;
	if(!isNaN(input)) {
		input = Number(input) * 1000;
	}
	date = new Date(input);
    date_str = date.toString();
	if(date_str === 'Invalid Date') {
		res.send('{"unix":null,"natural":null}');
	}
	else {
		day = date.getDate();
		month = monthNames[date.getMonth()];
		year = date.getFullYear();
		natural = month + " " + day + ", " + year;
		unix = Math.round(date.getTime()/1000);
		res.send('{"unix":'+unix+',"natural":"'+natural+'"}');
	}
})

app.listen(port, function () {
    console.log('Express server listening on port %d', port);
})
