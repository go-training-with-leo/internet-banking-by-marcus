import * as yup from 'yup';

const validPayment = yup.object().shape({
  totalAmount: yup.number().min(4).required('Money transfer is required'),
});

export default validPayment;
