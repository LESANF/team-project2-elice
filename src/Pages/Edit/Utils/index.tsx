import { accessClient } from '../../../axiosInstance';

export const LOCAL_URL = 'http://localhost:5001';

export const getUser = async (token: string) => {
  const result = await accessClient(token).get(`profiles/user`);
  console.log(`UTIL`, result.data.data[0]);
  return result.data.data[0];
};
