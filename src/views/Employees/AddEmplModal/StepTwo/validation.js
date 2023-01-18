import * as yup from 'yup';

const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

const validInfo = yup.object().shape({
  accountName: yup.string().min(6).max(20).required(),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

export default validInfo;
