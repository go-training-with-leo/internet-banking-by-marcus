import * as yup from 'yup';

const validSavingCard = yup.object().shape({
  balance: yup.number().min(10000).required('Require this field'),
});

export default validSavingCard;
