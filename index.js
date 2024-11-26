// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Endpoint for date handling
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Handle empty date parameter (current time)
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Check if date is a valid number or string
  let parsedDate = isNaN(date) ? new Date(date) : new Date(Number(date));

  // If date is invalid, return error
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
