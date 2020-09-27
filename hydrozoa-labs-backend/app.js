const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const csvparse = require('csv-parse/lib/sync')
const cors = require('cors')

const model = require('./datamodel.js')

const port = 3001;
const jsonPath = path.join(__dirname, 'data.json')

const app = express();

app.use(express.static(path.join(__dirname, '../hydrozoa-labs/build')))
app.use(express.json())
app.use(cors())

let data = undefined

DoServerStartupParsing()

app.get('/', function(req, res) {
    //console.log("Received request")
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// -------------------- ADD DATA ------------------------

// JSON input sample: {"name": "Alice"}
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

// JSON input sample: {"name": "Tanya"}
app.post('/createteacher', function(req, res) {
    if (!data.hasOwnProperty('teachers')) {
        data.teachers = []
    }
    newTeacherID = data.teachers.length

    let teacher = new model.Teacher(newTeacherID, req.body.name)
    data.teachers.push(teacher)

    saveData()
    res.send('OK')
})

// JSON input sample: {"name": "Gary", "isParent": true}
app.post('/createeducator', function(req, res) {
    if (!data.hasOwnProperty('educators')) {
        data.educators = []
    }
    newEducatorID = data.educators.length

    // Do it this way as a guard against the client forgetting to set isParent
    let isParent = false
    if (req.body.isParent) {
        isParent = true
    }

    let educator = new model.Educator(newEducatorID, req.body.name, isParent, [])
    data.educators.push(educator)

    saveData()
    res.send('OK')
})

// JSON input sample: {"name": "Ms. Frizzle's Math 11", "teacherID": 2, "courseID": 3, "studentIDs": [1, 4, 8]}
// Note that adding student IDs is option when creating a class, students can always be added to the class later
// via '/addstudenttoclass'
app.post('/createclass', function(req, res) {
    if (!data.hasOwnProperty('teachers') || req.body.teacherID >= data.teachers.length) {
        // Error
        return;
    }
    teacher = data.teachers[req.body.teacherID]

    if (!data.courses.hasOwnProperty(req.body.courseID)) {
        // Error
        return;
    }

    course = data.courses[req.body.courseID]
    teacher.createClass(req.body.name, course, req.body.studentIDs)

    saveData()
    res.send('OK')
})

// -------------------- MODIFY DATA --------------------------

// JSON input sample: {"teacherID": 7, "classIndex": 2, "studentID": 4}
app.post('/addstudenttoclass', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)

    theClass.addStudent(req.body.studentID)

    saveData()
    res.send('OK')
})

// JSON input sample: {"educatorID": 3, "studentID": 4}
app.post('/addstudenttoeducator', function(req, res) {
    educator = getEducator(req.body.educatorID)
    if (educator.hasStudent(req.body.studentID)) {
        console.log("Can't add student, educator already has that student")
        return
    }

    educator.addStudentID(req.body.studentID)

    saveData()
    res.send('OK')
})

// Usage: It's recommended you call '/getstudentprogress' first, modify the results, then send the results
// back as "completedModules". Otherwise you have to populate a bunch of arrays manually and that sucks.
// In the example below we call that chunk of json <COMPLETED_MODULES>
// JSON input sample: {"teacherID": 3, "classIndex": 1, "studentID": 3, "completedModules": <COMPLETED_MODULES>}
app.post('/updatestudentprogress', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)
    studentProgress.updateProgress(req.body.studentID, req.body.completedModules)

    saveData()
    res.send('OK')
})

// ----------------------------- QUERY DATA -------------------------------

// JSON input sample: {"courseID": 3}
// Returns a JSON representation of a Course object
app.post('/getcourseinfo', function(req, res) {
    courseID = parseInt(req.body.courseID)
    if (data.courses.hasOwnProperty(courseID)) {
        res.send(data.courses[courseID])
    }
    console.log("clicked")
})

// JSON input sample: {"teacherID": 1, "classIndex": 3, "studentID": 10}
// Returns a JSON representation of a StudentCourseProgress object. It's basically an array of arrays of bools.
app.post('/getstudentprogress', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    theClass = getTeacherClass(teacher, req.body.classIndex)
    studentProgress = theClass.studentProgress[req.body.studentID]
    res.send(studentProgress)
})

// JSON input sample: {"educatorID": 1}
// Returns a JSON representation of an Educator
app.post('/geteducator', function(req, res) {
    educatorID = parseInt(req.body.educatorID)
    res.send(data.educators[educatorID])
})

// No JSON input needed
app.post('/geteducators', function(req, res) {
    res.send(data.educators)
})

// JSON input sample: {"teacherID": 2}
app.post('/getteacher', function(req, res) {
    teacher = getTeacher(req.body.teacherID)
    res.send(teacher)
})

// No JSON input needed
app.post('/getteachers', function(req, res) {
    res.send(data.teachers)
})

// JSON input sample: {"studentID", 3}
app.post('/getstudent', function(req, res) {
    student = getStudent(req.body.studentID)
    res.send(student)
})

// No JSON input needed
app.post('/getstudents', function(req, res) {
    res.send(data.students)
})

// ---------------------------- UTILITY FUNCTIONS ---------------------------------

function DoServerStartupParsing() {
    // Load in the JSON data
    const jsonFileContents = fs.readFileSync(jsonPath)

    data = JSON.parse(jsonFileContents, (name, value) => {
        if (value !== null && typeof value === "object" && !Array.isArray(value) && value.hasOwnProperty("__type")) {
            if (value.__type === "Teacher") {
                return model.DeserializeTeacher(value)
            } else if (value.__type === "Student") {
                return model.DeserializeStudent(value)
            } else if (value.__type === "Educator") {
                return model.DeserializeEducator(value)
            } else if (value.__type === "Course") {
                return model.DeserializeCourse(value)
            } else if (value.__type === "Module") {
                return model.DeserializeModule(value)
            } else if (value.__type === "Class") {
                return model.DeserializeClass(value)
            } else if (value.__type === "StudentCourseProgress") {
                return model.DeserializeStudentCourseProgress(value)
            } else if (value.__type === "StudentModuleProgress") {
                return model.DeserializeStudentModuleProgress(value)
            }
        }

        return value
    })

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

function getTeacher(teacherID) {
    if (!data.hasOwnProperty('teachers') || teacherID >= data.teachers.length) {
        // Error
        return;
    }
    return data.teachers[teacherID]
}

function getEducator(educatorID) {
    if (!data.hasOwnProperty('educators') || educatorID >= data.educators.length) {
        // Error
        return;
    }
    return data.educators[educatorID]
}

function getTeacherClass(teacher, classIndex) {
    if (classIndex >= teacher.classes.length) {
        // Error
        return;
    }
    return teacher.classes[classIndex]
}

function getStudent(studentID) {
    if (!data.hasOwnProperty('students') || studentID >= data.students.length) {
        // Error
        return;
    }
    return data.students[studentID]
}

app.listen(port)
