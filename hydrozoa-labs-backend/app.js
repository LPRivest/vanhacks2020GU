const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);