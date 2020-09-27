// Created by teacher through their interface
class Student {
    constructor(id, name, parents) {
        this.id = id
        this.name = name
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
    constructor(id, name, isParent) {
        this.id = id
        this.name = name
        this.isParent = isParent
        this.students = [] 
    }

    addStudent(student) {
        // ...
    }

    hasStudent(student) {
        for (let i = 0; i < this.students.length; i++) {
            if (students[i] == student) {
                return true;
            }
        }

        return false;
    }

    updateStudentProgress(student, course, completedModules) {
        if(!this.hasStudent(student)) {
            this.students.addStudent(student);
        }

        for (let i = 0; i < this.students.length; i++) {
            if(student == this.students[i]) {

                for(let j = 0; j < this.students[i].classes.length; j++) {
                    if(students[i].classes[i].course == course) 
                    {
                        student[i].classes[i].course.addModule(completedModules);
                    }
                }
            }
        }
    }
}

// Created when teacher registers for our site
class Teacher {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.classes = []
    }

    //This is the same function as in Educator - Educator should be a superclass to Teacher and Parent
    hasStudent(student) {
        for (let i = 0; i < this.students.length; i++) {
            if (students[i] == student) {
                return true;
            }
        }

        return false;
    }

    //This is the same function as in Educator - Educator should be a superclass to Teacher and Parent
    updateStudentProgress(student, course, completedModules) {
        if(!this.hasStudent(student)) {
            this.students.addStudent(student);
        }

        for (let i = 0; i < this.students.length; i++) {
            if(student == this.students[i]) {

                for(let j = 0; j < this.students[i].classes.length; j++) {
                    if(students[i].classes[i].course == course) 
                    {
                        student[i].classes[i].course.addModule(completedModules);
                    }
                }
            }
        }
    }
  
    createClass(course, studentIDs) {
        let newClass = new Class(course, this, studentIDs);
        this.classes.push(newClass);
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
    }
}

// Created by teacher when they start a new class
class Class {
    constructor(name, course, teacher, studentIDs) {
        this.name = name
        this.course = course
        this.teacher = teacher

        this.studentProgress = new Object()
        for (let i = 0; i < studentIDs.length; i++) {
            this.studentProgress[studentIDs[i]] = new StudentCourseProgress(this)
        }

        this.lastUpdated = Date.now()
    }

    addStudent(studentID) {
        this.studentProgress[studentID] = new StudentCourseProgress(this)
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

