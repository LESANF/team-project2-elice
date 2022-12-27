import axios from 'axios';

export const LOCAL_URL = 'http://localhost:5001';

export const getUser = async (token: string) => {
  const result = await axios.get(`${LOCAL_URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('util', result);
  return result.data;
};

export const getPresignedURL: any = async (file: any) => {
  const form: any = new FormData();

  const s3BucketURL = 'https://photolog-bucket.s3.amazonaws.com/';

  const fieldsData = await axios
    .get(`http://localhost:5001/photos/presigned-url?filetype=${file.name}`)
    .then(async ({ data: { data } }) => {
      Object.keys(data.fields).forEach((key) => {
        form.append(key, data.fields[key]);
      });

      form.append('file', file);

      const s3ImgURL = await axios
        .post(s3BucketURL, form)
        .then((res: any) => res.headers.get('Location'));

      return s3ImgURL;
    });

  return fieldsData;
};
