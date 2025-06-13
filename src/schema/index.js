import * as yup from 'yup'

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,11}$/

export const registerFormSchema = yup.object().shape({
  fullname: yup.string().required('Full Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        'Password must be between 5 to 11 characters and have atleast 1 digit, one uppercase letter and one lowercase letter',
    })
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  role: yup.string().required('Please select a role'),
})

export const loginFormSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const postSchema = yup.object().shape({
  post_text: yup.string().test('isNotEmpty', 'Post cannot be empty', (value) => {
    if (!value) return false
    const text = value.replace(/<[^>]*>/g, '').trim()
    return text.length > 0
  }),
})

export const postCommentSchema = yup.object().shape({
  comment_text: yup.string().test('isNotEmpty', 'Comment cannot be empty', (value) => {
    if (!value) return false
    const text = value.replace(/<[^>]*>/g, '').trim()
    return text.length > 0
  }),
})
