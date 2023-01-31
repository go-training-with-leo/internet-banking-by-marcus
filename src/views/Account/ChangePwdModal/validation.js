import * as yup from 'yup';

const validPassword = yup.object().shape({
  currentPassword: yup.string().min(8).max(16).required('Require field'),
  newPassword: yup.string().min(8).max(16).required('Require field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default validPassword;
