const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const app = express();

app.use(express.json());
app.use(cors());
app.use(history());

// Configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// To serve project on different page route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = 5005;
app.listen(port, () => console.log('Listening'));
