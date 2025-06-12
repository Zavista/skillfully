import express from 'express';
import { listCourses, getCourse } from '../controllers/courseController';

const router = express.Router();

router.get('/', listCourses); // List all courses or filter by category
router.get('/:id', getCourse); // Get a specific course by ID

export default router;