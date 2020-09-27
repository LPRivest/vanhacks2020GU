const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const csvparse = require('csv-parse/lib/sync')

const model = require('./datamodel.js')

const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')))

// Load in the JSON data
const jsonPath = path.join(__dirname, 'data.json')
const jsonFileContents = fs.readFileSync(jsonPath)
let data = JSON.parse(jsonFileContents)

// Parse in the CSV curriculum data
const csvPath = path.join(__dirname, 'curriculum.csv')
const csvFileContents = fs.readFileSync(csvPath)
const courseDB = csvparse(csvFileContents, {
    columns: true,
    skip_empty_lines: true
})

// Populate the in-memory data with the parsed CSV curriculum data

app.get('/', function(req, res) {
    //console.log("Received request")
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/', function(req, res) {
    res.send(courseDB)
})

app.post('/save', function(req, res) {

    data.test = "hello!"

    jsonString = JSON.stringify(data)
    fs.writeFile(jsonPath, jsonString, function(err) {
        if (err) {
            return console.log(err)
        } else {
            console.log("Successfully wrote JSON data")
            res.send("Success")
        }
    })
})

app.listen(port)
