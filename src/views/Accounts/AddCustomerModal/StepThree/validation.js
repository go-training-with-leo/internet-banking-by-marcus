import * as yup from 'yup';

const validBalance = yup.object().shape({
  balance: yup.number().min(10000).required(),
});

export default validBalance;
