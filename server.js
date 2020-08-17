/* eslint-disable camelcase */
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const app = express();
const https = require('https');
const fs = require('fs');

/**
 * Load secret variables
 */

const { location_cert, location_chain, location_key } = require('./config.js');

app.use(express.json());
app.use(cors());
app.use(history());

// Configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// To serve project on different page route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

https
  .createServer(
    {
      key: fs.readFileSync(location_key),
      cert: fs.readFileSync(location_cert),
      ca: fs.readFileSync(location_chain),
    },
    app
  )
  .listen(5010, () => {
    console.log(`Listening on 5010`);
  });

const port = 5005;
app.listen(port, () => console.log(`Listening ${port}`));
