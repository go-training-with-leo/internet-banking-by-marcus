import * as yup from 'yup';

const validEmail = yup.object().shape({
  email: yup.string().email().required('Require field'),
});

const validOTP = yup.object().shape({
  otp: yup.string().min(5).required('Require field'),
});

const validPassword = yup.object().shape({
  new_password: yup.string().min(8).max(16).required('Require field'),
  renew_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

const validForm = yup.object().shape({
  email: yup.string().email().required('Require field'),
  otp: yup.string().min(5).required('Require field'),
  new_password: yup.string().min(8).max(16).required('Require field'),
  renew_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

export { validEmail, validForm, validOTP, validPassword };
