require('./connections/connection.mongo')();
const express = require('express');
const bodyParser = require('body-parser');
const courseModel = require('./Model/course.model');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//Error object after hiting the wrong endpoint
let aboutApp = {
    name: 'Past Questions App',
    version: 'Version 1.0',
    developer_mail: 'musjib999@gmail.com',
    author: 'Musa Jibril'
}

//add new course endpoint
server.post('/course', (req, res) => {
    let newCourse = new courseModel(req.body);

    newCourse.save((err, course) => {
        if (err) {
            res.status(400).json({ status: 'failed', payload: null, message: `Error added course >>> ${err}` });
        } else {
            res.status(200).json({ status: 'success', payload: course, message: 'Course added successfully' });
        }
    });
});

//get all courses endpoint
server.get('/course', (req, res) => {
    courseModel.find((err, allCourses) => {
        if (err) {
            res.status(400).json({ status: 'failed', payload: null, message: `Error getting all courses >>> ${err}` });
        } else {
            res.status(200).json({ status: 'success', payload: allCourses, message: 'All courses fetched successfully' });
        }
    });
});

//single course by id endpoint
server.get('/course/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        courseModel.findById(id, (err, singleCourse) => {
            if (err) {
                res.status(400).json({ status: 'failed', payload: null, message: `Error getting single course >>> ${err}` });
            } else {
                res.status(200).json({ status: 'success', payload: singleCourse, message: 'Single course fetched successfully' });
            }
        });
    } else {
        res.status(404).json({ status: 'failed', payload: null, message: 'Invalid ID to fetch' });
    }
});

//update course question endpoint
server.put('/course/:id', (req, res) => {
    const id = req.params.id;
    let  question  = req.body;
    if (id) {
        courseModel.findByIdAndUpdate(id, { $set:  question  }, { new: true }, (err, updatedCourse) => {
            if (err) {
                res.status(400).json({ status: 'failed', payload: null, message: `Error updating course >>> ${err}` });
            } else {
                res.status(200).json({ status: 'success', payload: updatedCourse, message: 'Course updated successfully' });
            }
        });
    } else {
        res.status(404).json({ status: 'failed', payload: null, message: 'Invalid ID to update' });
    }
});

//delete a course endpoint
server.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        courseModel.findByIdAndDelete(id, (err, result) => {
            if (err) {
                res.status(400).json({ status: 'failed', payload: null, message: `Error deleting course >>> ${err}` });
            } else {
                res.status(200).json({ status: 'success', payload: null, message: 'Course deleted successfully' });
            }
        });
    } else {
        res.status(404).json({ status: 'failed', payload: null, message: 'Invalid ID to delete' });
    }
});



//get all non existing endpoints
server.get('*', (req, res) => {
    res.status(400).json({ status: 'Failed', payload: aboutApp, message: 'End point does not exist' });
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
});


module.exports.server = server;