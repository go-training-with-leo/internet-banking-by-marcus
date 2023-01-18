import * as yup from 'yup';

const validBalance = yup.object().shape({
  balance: yup.number().required(),
});

export default validBalance;
