import * as yup from 'yup';

const validEmail = yup.object().shape({
  email: yup.string().email().required('Require field'),
});

const validOTP = yup.object().shape({
  otp: yup.string().min(5).required('Require field'),
});

const validPassword = yup.object().shape({
  newPassword: yup.string().min(8).max(16).required('Require field'),
  renewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export { validEmail, validOTP, validPassword };
