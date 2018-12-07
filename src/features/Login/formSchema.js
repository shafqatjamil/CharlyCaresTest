import yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Field is required')
    .email('Email is not valid'),
  password: yup.string().required('Field is required'),
});

export default loginSchema;
