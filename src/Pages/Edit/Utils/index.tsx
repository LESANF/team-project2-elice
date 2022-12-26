import axios from 'axios';

export const LOCAL_URL = 'http://localhost:5001';

export const getUser = async (token: string) => {
  const result = await axios.get(`${LOCAL_URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('util', result);
  return result.data;
};
