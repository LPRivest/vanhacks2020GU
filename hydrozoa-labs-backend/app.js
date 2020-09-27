const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const csvparse = require('csv-parse/lib/sync')

const model = require('./datamodel.js')

const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')))

const csvPath = path.join(__dirname, 'curriculum.csv')
const csvFile = fs.readFileSync(csvPath)
const courseDB = csvparse(csvFile, {
    columns: true,
    skip_empty_lines: true
})

app.get('/', function(req, res) {
    //console.error("Received request")
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.post('/', function(req, res) {
    res.send(courseDB)
});


app.listen(port)
