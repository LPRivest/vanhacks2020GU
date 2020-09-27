const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const csvparse = require('csv-parse/lib/sync')

const model = require('./datamodel.js')

const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')))
app.use(express.json())

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

// In-memory curriculum data
let courseData = {}

// Populate the in-memory data with the parsed CSV curriculum data
for (let i = 0; i < courseDB.length; i++) {
    let courseID = parseInt(courseDB[i].Course_ID)
    if (courseData.hasOwnProperty(courseID)) {
        var course = courseData[courseID]
    } else {
        var course = new model.Course(courseID, courseDB[i].Course_Name, courseDB[i].Grade)
        courseData[courseID] = course
    }
    
    let moduleID = parseInt(courseDB[i].Content_ID)
    if (course.hasOwnProperty(moduleID)) {
        var module = course.modules[moduleID]
    } else {
        var module = new model.Module(moduleID, courseDB[i].Modules)
        course.addModule(module)
    }

    module.addLesson(courseDB[i].Lessons)
}

// Debug print the loaded courseData
/*
for (let courseID in courseData) {
    if (Object.prototype.hasOwnProperty.call(courseData, courseID)) {
        let course = courseData[courseID]
        console.log(course)
        console.log(course.modules)
    }
}
*/

app.get('/', function(req, res) {
    //console.log("Received request")
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// API endpoint to query for data about a particular course
app.post('/getcourseinfo', function(req, res) {
    classID = parseInt(req.body.classID)
    if (courseData.hasOwnProperty(classID)) {
        res.send(courseData[classID])
    }
})

app.post('/addteacher', function(req, res) {
    if (!data.hasOwnProperty(teachers)) {
        data.teachers = []
    }
    newTeacherID = data.teachers.length

    let teacher = new Teacher(newTeacherID, req.body.name, [])
    data.teachers.push(teacher)
    res.send('OK')
})

app.post('/addeducator', function(req, res) {
    if (!data.hasOwnProperty(educators)) {
        data.educators = []
    }
    newEducatorID = data.educators.length

    let educator = new Educator(newEducatorID, req.body.name, req.body.isParent, [])
    data.educators.push(educator)
    res.send('OK')
})

app.post('/createclass', function(req, res) {
    if (!data.hasOwnProperty(teachers) || data.teachers.length >= req.body.teacherID) {
        // Error
        return;
    }
    teacher = data.teachers[req.body.teacherID]
    teacher.createClass(req.body.course, req.body.studentsIDs)
    res.send('OK')
})

app.post('/createstudent', function(req, res) {
    if (!data.hasOwnProperty(students)) {
        data.students = []
    }
    newStudentID = data.students.length

    let student = new Student(newStudentID, req.body.name)
    data.students.push(student)
    res.send('OK')
})

app.post('/addstudenttoclass', function(req, res) {
    if (!data.hasOwnProperty(teachers) || data.teachers.length >= req.body.teacherID) {
        // Error
        return;
    }
    teacher = data.teachers[req.body.teacherID]

    if (teacher.classes.length >= req.body.classIndex) {
        // Error
        return;
    }
    theClass = teacher.classes[req.body.classIndex]

    theClass.addStudent(req.body.studentID)
    res.send('OK')
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
