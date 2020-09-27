// Created by teacher through their interface
class Student {
    constructor(id, name) {
        this.id = id
        this.name = name

        // Pairs of {teacherID, courseID}
        this.classes = []
    }

    addClass(theClass) {
        this.classes.push({"teacherID": theClass.teacherID, "courseID": theClass.courseID})
    }
}

// Created when parent/educator registers for our site
class Educator {
    constructor(id, name, isParent) {
        this.id = id
        this.name = name
        this.isParent = isParent
        this.students = [] 
    }

    addStudent(student) {
        this.students.push(student)
    }

    hasStudent(studentID) {
        for (let i = 0; i < this.students.length; i++) {
            if (students[i].id == studentID) {
                return true;
            }
        }

        return false;
    }

    updateStudentProgress(studentID, courseID, completedModules) {
        if (!this.hasStudent(student.id)) {
            return false
        }

        for (let i = 0; i < this.students.length; i++) {
            if (student.id == this.students[i].id) {

                for (let j = 0; j < this.students[i].classes.length; j++) {
                    if (students[i].classes[j].course.id == courseID) 
                    {
                        student[i].classes[j].course.addModule(completedModules);
                    }
                }
                break
            }
        }
        
        return true
    }
}

// Created when teacher registers for our site
class Teacher {
    constructor(id, name) {
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
  
    createClass(course, studentIDs) {
        let newClass = new Class(course, this, studentIDs);
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

// Created automatically when a student is added to a class
class StudentModuleProgress {
    constructor(module) {
        this.moduleID = moduleID
        
        this.completedLessons = []
        for (let i = 0; i < module.lessons.length; i++) {
            this.completedLessons.push(false)
        }
    }

    setDone(lessonIndex, isDone) {
        this.completedLessons[lessonIndex] = isDone
    }
}

// Created automatically when a student is added to a class
class StudentCourseProgress {
    constructor(theClass) {
        this.theClass = theClass

        this.completedModules = []
        for (let i = 0; i < theClass.course.modules.length; ++i) {
            this.completedModules.push(new StudentModuleProgress(theClass.course.modules[i]))
        }
    }
}

// Created by teacher when they start a new class
class Class {
    constructor(name, courseID, teacherID, studentIDs) {
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

// Added by us? Or teachers who have the ability to add a new course to the database?
class Course {
    constructor(id, name, grade) {
        this.id = id
        this.name = name
        this.grade = grade

        this.modules = {}
    }

    addModule(module) {
        this.modules[module.id] = module
    }
}

// Added at the same time as Course
class Module {
    constructor(id, name, description) {
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

module.exports = {
    Student, Educator, Teacher, StudentModuleProgress, StudentCourseProgress, Class, Course, Module
}

