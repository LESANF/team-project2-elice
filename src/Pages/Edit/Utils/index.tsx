import { accessClient } from '../../../axiosInstance';

export const LOCAL_URL = 'http://localhost:5001';

export const getUser = async (token: string) => {
  const result = await accessClient(token).get(`users/`);
  console.log(`UTIL`, result);
  return result.data;
};
