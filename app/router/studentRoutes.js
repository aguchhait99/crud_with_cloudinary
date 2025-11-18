const express = require('express');
const ImageUpload = require('../helper/imageUpload');
const StudentController = require('../controller/StudentController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@gmail.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         age:
 *           type: number
 *           example: 20
 *         photo:
 *           type: string
 *           example: https://res.cloudinary.com/.../image.jpg
 *
 *   requestBodies:
 *     StudentFormData:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student (with image upload)
 *     tags: [Students]
 *     requestBody:
 *       $ref: '#/components/requestBodies/StudentFormData'
 *     responses:
 *       201:
 *         description: Student created successfully
 */
router.post('/students', ImageUpload.single('photo'), StudentController.createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students retrieved
 */
router.get('/students', StudentController.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a single student
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details retrieved
 *       404:
 *         description: Student not found
 */
router.get('/students/:id', StudentController.singleStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/students/:id', StudentController.deleteStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student (with image upload)
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       $ref: '#/components/requestBodies/StudentFormData'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
router.put('/students/:id', ImageUpload.single('photo'), StudentController.updateStudent);

module.exports = router;
