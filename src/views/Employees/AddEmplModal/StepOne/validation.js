import * as yup from 'yup';

const validEmail = yup.object().shape({
  email: yup.string().email().required('Require field'),
});

export default validEmail;
