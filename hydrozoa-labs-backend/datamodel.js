// Created by teacher through their interface
class Student {
    constructor(id, name) {
        this.__type = "Student"
        this.id = id
        this.name = name

        // Pairs of {teacherID, courseID}
        this.classes = []
    }

    addClass(theClass) {
        this.classes.push({"teacherID": theClass.teacherID, "courseID": theClass.courseID})
    }
}

function DeserializeStudent(obj) {
    student = new Student(0, "")
    Object.assign(student, obj)
    return student
}

// Created when parent/educator registers for our site
class Educator {
    constructor(id, name, isParent) {
        this.__type = "Educator"
        this.id = id
        this.name = name
        this.isParent = isParent
        this.studentIDs = [] 
    }

    addStudentID(studentID) {
        this.studentIDs.push(studentID)
    }

    hasStudent(studentID) {
        for (let i = 0; i < this.studentIDs.length; i++) {
            if (this.studentIDs[i] == studentID) {
                return true;
            }
        }

        return false;
    }

    updateStudentProgress(student, theClass, updatedCompletedModules) {
        if (this.hasStudent(student.id)) {
            for (let i = 0; i < this.studentIDs.length; i++) {
                if (studentIDs[i] == student.id) {
                    if (student.hasOwnProperty(theClass)) {
                        theClass.updateProgress(student.id, updatedCompletedModules);
                    }
                }
            }
        } else {
            addStudentID(student.id)
            if (student.hasOwnProperty(theClass)) {
                theClass.updateProgress(student.id, updatedCompletedModules);
            }
        }
    }
}

function DeserializeEducator(obj) {
    educator = new Educator(0, "", false)
    Object.assign(educator, obj)
    return educator
}

// Created when teacher registers for our site
class Teacher {
    constructor(id, name) {
        this.__type = "Teacher"
        this.id = id
        this.name = name
        this.classes = []
    }

    hasStudent(studentID) {
        for (let classIndex = 0; i < this.classes.length; i++) {
            if (this.classes[classIndex].hasOwnProperty(studentID)) {
                return true;
            }
        }

        return false;
    }

    updateStudentProgress(studentID, courseID, updatedCompletedModules) {
        for (let i = 0; i < this.classes.length; i++) {
            if (this.classes[i].hasStudent(studentID)) {
                this.classes[i].updateProgress(studentID, updatedCompletedModules)
            }
        }
    }
  
    createClass(name, course, studentIDs) {
        let newClass = new Class(name, course.id, this.id, studentIDs);
        this.classes.push(newClass);
    }

    getClass(courseID) {
        for (let i = 0; i < this.classes.length; i++) {
            if (this.classes[i].course.id == courseID) {
                return this.classes[i]
            }
        }

        return undefined
    }
}

function DeserializeTeacher(obj) {
    teacher = new Teacher(0, "")
    Object.assign(teacher, obj)
    return teacher
}

// Created automatically when a student is added to a class
class StudentModuleProgress {
    constructor(module) {
        this.__type = "StudentModuleProgress"
        if (module) {
            this.moduleID = module.id
            
            this.completedLessons = []
            for (let i = 0; i < module.lessons.length; i++) {
                this.completedLessons.push(false)
            }
        }
    }

    setDone(lessonIndex, isDone) {
        this.completedLessons[lessonIndex] = isDone
    }
}

function DeserializeStudentModuleProgress(obj) {
    smp = new StudentModuleProgress(null)
    Object.assign(smp, obj)
    return smp
}

// Created automatically when a student is added to a class
class StudentCourseProgress {
    constructor(theClass) {
        this.__type = "StudentCourseProgress"
        if (theClass) {
            this.course = theClass.course

            this.completedModules = []
            for (let i = 0; i < this.course.modules.length; ++i) {
                this.completedModules.push(new StudentModuleProgress(this.course.modules[i]))
            }
        }
    }
}

function DeserializeStudentCourseProgress(obj) {
    scp = new StudentCourseProgress(null)
    Object.assign(scp, obj)
    return scp
}

// Created by teacher when they start a new class
class Class {
    constructor(name, courseID, teacherID, studentIDs) {
        this.__type = "Class"
        this.name = name
        this.courseID = courseID
        this.teacherID = teacherID

        this.studentProgress = new Object()
        for (let i = 0; i < studentIDs.length; i++) {
            this.studentProgress[studentIDs[i]] = new StudentCourseProgress(this)
        }

        this.lastUpdated = Date.now()
    }

    addStudent(studentID) {
        this.studentProgress[studentID] = new StudentCourseProgress(this)
    }

    hasStudent(studentID) {
        return this.studentProgress.hasOwnProperty(studentID)
    }

    updateProgress(studentID, updatedCompletedModules) {
        studentProgress = this.studentProgress[studentID]
        for (let moduleIndex = 0; moduleIndex < studentProgress.completedModules.length; moduleIndex++) {
            module = studentProgress.completedModules[i]
            for (let lessonIndex = 0; lessonIndex < module.completedLessons.length; i++) {
                module.completedLessons[i] = updatedCompletedModules[i].completedLessons[i]
            }
        }

        this.lastUpdated = Date.now()
    }
}

function DeserializeClass(obj) {
    theClass = new Class("", 0, 0, 0)
    Object.assign(theClass, obj)
    return theClass
}

// Added by us? Or teachers who have the ability to add a new course to the database?
class Course {
    constructor(id, name, grade) {
        this.__type = "Course"
        this.id = id
        this.name = name
        this.grade = grade

        this.modules = {}
    }

    addModule(module) {
        this.modules[module.id] = module
    }
}

function DeserializeCourse(obj) {
    course = new Teacher(0, "", 0)
    Object.assign(course, obj)
    return course
}

// Added at the same time as Course
class Module {
    constructor(id, name) {
        this.__type = "Module"
        this.id = id
        this.name = name

        // Order matters, this is the order of the lessons.
        // Other code refers to lessons by index, don't reorder them arbitrarily
        this.lessons = []
    }

    addLesson(description) {
        this.lessons.push(description)
    }
}

function DeserializeModule(obj) {
    module = new Module(0, "")
    Object.assign(module, obj)
    return module
}

module.exports = {
    Student, Educator, Teacher, StudentModuleProgress, StudentCourseProgress, Class, Course, Module,
    DeserializeStudent, DeserializeEducator, DeserializeTeacher, DeserializeStudentModuleProgress,
    DeserializeStudentCourseProgress, DeserializeClass, DeserializeCourse, DeserializeModule
}

