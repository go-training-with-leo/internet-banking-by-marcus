import * as yup from 'yup';

const validContact = yup.object().shape({
  cardNumber: yup.string().min(16).required('Require field'),
});

export default validContact;
