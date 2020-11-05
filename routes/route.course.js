const express = require('express');
const CourseController = require('../Controller/course.controller');

module.exports = () => {
    const pastQapi = express.Router();

    //post course
    pastQapi.post('/course', async (req, res) => {
        try {
            const addCourse = await CourseController.addNewCourse(req.body);
            res.status(200).json({ status: 'success', addCourse, message: 'Course added successfully!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });


    //gerall
    pastQapi.get('/course', async (req, res) => {
        try {
            const allCourses = await CourseController.getAllCourse();
            res.status(200).json({ status: 'success', payload: allCourses, message: 'All courses fetched successfully' });

        } catch (err) {
            res.status(200).json({ status: 'success', payload: allCourses, message: 'All courses fetched successfully' });
        }
    });

    //get one
    pastQapi.get('/course/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                const singleCourse = await CourseController.getOneCourse(id);
                res.status(200).json({ status: 'success', payload: singleCourse, message: 'Single course fetched Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(404).json({ status: 'failed', payload: null, message: 'Invalid course ID to fetch' });
        }
    });

    //update
    pastQapi.put('/course/:id', async (req, res) => {
        const id = req.params.id;
        const { question } = req.body;
        if (id) {
            try {
                const updateCourse = await CourseController.updateCourse(id, question);
                res.status(200).json({ status: 'success', payload: updateCourse, message: 'Course question updated Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(404).json({ status: 'failed', payload: null, message: 'Invalid course ID to update' });
        }
    });

    //delete
    pastQapi.delete('/course/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                await CourseController.deleteCourse(id);
                res.status(200).json({ status: 'success', payload: null, message: 'Course Deleted Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(404).json({ status: 'failed', payload: null, message: 'Invalid course ID to delete' });
        }
    });

    return pastQapi;
    
}