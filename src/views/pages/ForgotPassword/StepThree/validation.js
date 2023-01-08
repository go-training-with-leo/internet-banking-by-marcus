import * as yup from 'yup';

const validPassword = yup.object().shape({
  newPassword: yup.string().min(8).max(16).required('Require field'),
  renewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default validPassword;
