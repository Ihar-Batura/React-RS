import * as yup from 'yup';
import type { FormInput } from '../types/types';

export const schema: yup.ObjectSchema<FormInput> = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),

  age: yup
    .number()
    .required('Age is required')
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(1, 'Age must be at least 1'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  gender: yup
    .mixed<'male' | 'female'>()
    .oneOf(['male', 'female'], 'Gender is required')
    .required('Gender is required'),

  country: yup.string().required('Country is required'),

  profilePicture: yup
    .mixed<FileList>()
    .test('required', 'Profile picture is required', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file.size <= 5 * 1024 * 1024;
    })
    .test('fileFormat', 'Only .png and .jpeg files are allowed', (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return ['image/jpeg', 'image/png'].includes(file.type);
    }),

  acceptedTerms: yup
    .boolean()
    .required('You must accept the Terms and Conditions')
    .oneOf([true], 'You must accept the Terms and Conditions'),
}) as yup.ObjectSchema<FormInput>;
