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

DoServerStartupParsing()

app.get('/', function(req, res) {
    //console.log("Received request")
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// -------------------- ADD DATA ------------------------

app.post('/addteacher', function(req, res) {
    if (!data.hasOwnProperty('teachers')) {
        data.teachers = []
    }
    newTeacherID = data.teachers.length

    let teacher = new model.Teacher(newTeacherID, req.body.name)
    data.teachers.push(teacher)

    saveData()
    res.send('OK')
})

app.post('/addeducator', function(req, res) {
    if (!data.hasOwnProperty('educators')) {
        data.educators = []
    }
    newEducatorID = data.educators.length

    let educator = new model.Educator(newEducatorID, req.body.name, req.body.isParent, [])
    data.educators.push(educator)

    saveData()
    res.send('OK')
})

app.post('/createclass', function(req, res) {
    if (!data.hasOwnProperty('teachers') || data.teachers.length >= req.body.teacherID) {
        // Error
        return;
    }
    teacher = data.teachers[req.body.teacherID]

    if (!data.courses.hasOwnProperty(req.body.courseID)) {
        // Error
        return;
    }

    course = data.courses[req.body.courseID]
    teacher.createClass(req.body.course, req.body.studentsIDs)

    saveData()
    res.send('OK')
})

app.post('/createstudent', function(req, res) {
    if (!data.hasOwnProperty('students')) {
        data.students = []
    }
    newStudentID = data.students.length

    let student = new model.Student(newStudentID, req.body.name)
    data.students.push(student)

    saveData()
    res.send('OK')
})

// -------------------- MODIFY DATA --------------------------

function getTeacher(teacherID) {
    if (!data.hasOwnProperty('teachers') || data.teachers.length >= req.body.teacherID) {
        // Error
        return;
    }
    return data.teachers[req.body.teacherID]
}

function getTeacherClass(teacher, classIndex) {
    if (teacher.classes.length >= req.body.classIndex) {
        // Error
        return;
    }
    return teacher.classes[req.body.classIndex]
}

app.post('/addstudenttoclass', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)

    theClass.addStudent(req.body.studentID)

    saveData()
    res.send('OK')
})


app.post('/updatestudentprogress', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)
    studentProgress.updateProgress(req.body.studentID, req.mody.completedModules)

    saveData()
    res.send('OK')
})

// ----------------------------- QUERY DATA -------------------------------

app.post('/getcourseinfo', function(req, res) {
    classID = parseInt(req.body.classID)
    if (data.courses.hasOwnProperty(classID)) {
        res.send(data.courses[classID])
    }
})

app.post('/getstudentprogress', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)
    studentProgress = theClass.studentProgress[req.body.studentID]
    res.send(studentProgress)
})

// ---------------------------- UTILITY FUNCTIONS ---------------------------------

function DoServerStartupParsing() {
    // Load in the JSON data
    const jsonPath = path.join(__dirname, 'data.json')
    const jsonFileContents = fs.readFileSync(jsonPath)
    let data = JSON.parse(jsonFileContents)

    if (!data.hasOwnProperty('courses')) {
        // Parse in the CSV curriculum data if we haven't parsed it into our JSON data yet
        const csvPath = path.join(__dirname, 'curriculum.csv')
        const csvFileContents = fs.readFileSync(csvPath)
        const courseDB = csvparse(csvFileContents, {
            columns: true,
            skip_empty_lines: true
        })

        // Populate the in-memory data with the parsed CSV curriculum data
        data.courses = {}
        for (let i = 0; i < courseDB.length; i++) {
            let courseID = parseInt(courseDB[i].Course_ID)
            if (data.courses.hasOwnProperty(courseID)) {
                var course = data.courses[courseID]
            } else {
                var course = new model.Course(courseID, courseDB[i].Course_Name, courseDB[i].Grade)
                data.courses[courseID] = course
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
    }
}

function saveData() {
    jsonString = JSON.stringify(data)
    fs.writeFile(jsonPath, jsonString, function(err) {
        if (err) {
            console.error(err)
        } else {
            console.log("Successfully wrote JSON data")
        }
    })
}

app.listen(port)
