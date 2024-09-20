// index.js
// where your node app starts

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// init project
import express from 'express';
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let { date } = req.params;

  if (!isNaN(date)) {
    date = +date
  }

  if (new Date(date) == "Invalid Date") {
    console.log(new Date(date));
    res.json({
      error: "Invalid Date"
    })
    return
  }

  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString()
  });
});

// empty params
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
