import { Request, Response } from 'express';
import Course from '../models/courseModel';

export const listCourses = async (req: Request, res: Response):Promise<void> => {
    const category = req.query.category;

    try {
        const courses = category && category !== 'all'
            ? await Course.scan('category').eq(category).exec()
            : await Course.scan().exec();
        // if category exists and is not 'all', filter courses by category, else retrieve all courses
    
        res.json({message: 'Courses retrieved successfully', data: courses});
    } catch(error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({message: 'Error retrieving courses', error});
    }
}

export const getCourse = async (req: Request, res: Response): Promise<void> => {
    const courseId = req.params.id;

    try {
        const course = await Course.get(courseId);
        if (!course) {
            res.status(404).json({message: 'Course not found'});
            return;
        }
        res.json({message: 'Course retrieved successfully', data: course});
    } catch(error) {
        console.error('Error retrieving course:', error);
        res.status(500).json({message: 'Error retrieving course', error});
    }
}