import * as yup from 'yup';

const validPayment = yup.object().shape({
  totalAmount: yup.number().min(10000).required('Money transfer is required'),
});

export default validPayment;
