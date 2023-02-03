import * as yup from 'yup';

const validOTP = yup.object().shape({
  otp: yup.string().min(5).required('Require field'),
});

export default validOTP;
