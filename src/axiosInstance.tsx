import axios from 'axios';

export const URL = 'http://34.64.34.184:5001';
// export const URL = `http://localhost:5001`; // 'http://34.64.34.184:5001';

export const client = axios.create({
  baseURL: URL,
});

export const accessClient = (token: string) =>
  axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getprofilePresignedURL: any = async (file: any) => {
  const form: any = new FormData();

  const s3BucketURL = 'https://photolog-bucket.s3.amazonaws.com/';

  const fieldsData = await axios
    .get(`${URL}/photos/presigned-url?filetype=${file.name}`)
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
