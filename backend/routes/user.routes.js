import express from 'express';
import { body } from 'express-validator'
import { registerUser } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register',[
    body('fullName.firstName').isLength({ min:3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],registerUser)

export default router;