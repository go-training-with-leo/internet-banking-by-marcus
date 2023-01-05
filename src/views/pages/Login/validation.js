import * as yup from 'yup';

const signInValidate = yup.object().shape({
  email: yup.string().email().required('Require field'),
  password: yup.string().min(6).max(14).required('Require field'),
});

export { signInValidate };
