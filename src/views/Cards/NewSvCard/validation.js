import * as yup from 'yup';

const validSavingCard = yup.object().shape({
  balance: yup.number().min(500000).required('Require this field'),
});

export default validSavingCard;
