import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  ...loginValidation,
  body('fullName', 'Full name must be at least 3 characters long').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];
