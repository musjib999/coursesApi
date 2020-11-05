const CourseModel = require('../Model/course.model');

class CourseController {
    constructor() { }

    addNewCourse(obj) {
        return new Promise((resolve, reject) => {
            let newCourse = new CourseModel(obj);
            newCourse.save((err, savedCourse) => {
                if (err) {
                    reject(err);
                }
                resolve(newCourse);
            });
        });
    }

    getAllCourse() {
        return new Promise((resolve, reject) => {
            CourseModel.find((err, allCourses) => {
                if (err) {
                    reject(err)
                }
                resolve(allCourses);
            });
        });
    }

    getOneCourse(id) {
        return new Promise((resolve, reject) => {
            CourseModel.findById(id, (err, singleCourses) => {
                if (err) {
                    reject(err)
                }
                resolve(singleCourses);
            });
        });
    }

    updateCourse(id, question) {
        return new Promise((resolve, reject) => {
            CourseModel.findByIdAndUpdate(id, { $set: question }, { new: true }, (err, updatedCourse) => {
                if (err) {
                    reject(err)
                }
                resolve(updatedCourse);
            });
        });
    }

    deleteCourse(id){
        return new Promise((resolve, reject) => {
            CourseModel.findByIdAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                } 
                resolve('Course Deleted Successfully');
            });
        });
    }
}

module.exports = new CourseController();