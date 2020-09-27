// Created by teacher through their interface
class Student {
    constructor(id, name, parents) {
        this.id = id
        this.name = name
        this.parents = parents
        this.classes = []
    }

    getProgress(courseID) {
        for (let i = 0; i < this.classes.length; i++) {
            if (this.classes[i].course.id == courseID) {
                return this.classes[i].studentProgress[this.id]
            }
        }
    }
}

// Created when parent/educator registers for our site
class Educator {
    constructor(id, name, students, isParent) {
        this.id = id
        this.name = name
        this.students = students
        this.isParent = isParent
    }

    updateStudentProgress(student, course, completedModules) {
        // ...
    }
}

// Created when teacher registers for our site
class Teacher {
    constructor(id, name, classes) {
        this.id = id
        this.name = name
        this.classes = []
    }

    updateStudentProgress(student, course, completedModules) {
        // ...
    }

    createClass(course, students) {
        // ...
    }
}

// Created automatically when a student is added to a class
class StudentModuleProgress {
    constructor(module) {
        this.module = module
        
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

        console.log(i)
    }
}

// Created by teacher when they start a new class
class Class {
    constructor(course, teacher, students) {
        this.course = course
        this.teacher = teacher

        this.studentProgress = new Object()
        for (let i = 0; i < students.length; i++) {
            this.studentProgress[students[i].id] = new StudentCourseProgress(this)
        }
    }

    addStudent(student) {
        this.studentProgress[student.id] = new StudentCourseProgress(this)
    }
}

// Added by us? Or teachers who have the ability to add a new course to the database?
class Course {
    constructor(id, name, grade, teacher, students) {
        this.id = id
        this.name = name
        this.grade = grade

        // Order matters, this is the order of the modules
        // Other code refers to modules by index, don't reorder them arbitrarily
        this.modules = []
    }

    addModule(module) {
        this.modules.push(module)
    }
}

// Added at the same time as Course
class Module {
    constructor(name, description) {
        this.name = name
        this.description = description

        // Order matters, this is the order of the lessons.
        // Other code refers to lessons by index, don't reorder them arbitrarily
        this.lessonsDescriptions = []
    }

    addLesson(description) {
        this.lessons.push(description)
    }
}

module.exports = {
    Student, Educator, Teacher, StudentModuleProgress, StudentCourseProgress, Class, Course, Module
}

