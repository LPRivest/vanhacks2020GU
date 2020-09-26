const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;


/*
let html = fs.readFileSync('../hydrozoa-labs/public/index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/





const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
