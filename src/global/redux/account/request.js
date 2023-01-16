import axios from 'axios';

const checkEmailExist = async (email) => {
  const {
    data: { message },
  } = await axios.post('http://localhost:3000/exist-email', {
    email: email,
  });

  return message;
};

export { checkEmailExist };
