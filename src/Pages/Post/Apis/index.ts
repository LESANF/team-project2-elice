import axios from 'axios';

export const getPresignedURL: any = async (file: any) => {
  const form: any = new FormData();

  const s3BucketURL = 'https://photolog-bucket.s3.amazonaws.com/';

  const fieldsData = await axios
    .get(`http://34.64.34.184:5001/photos/presigned-url?filetype=${file.name}`)
    .then(async ({ data: { data } }) => {
      Object.keys(data.fields).forEach((key) => {
        form.append(key, data.fields[key]);
      });
      form.append('file', file);

      const s3ImgURL = await axios
        .post(s3BucketURL, form)
        .then((res: any) => res.headers.get('Location'))
        .then(async (locationUrl) =>
          axios.post(`http://34.64.34.184:5001/photos`, { url: locationUrl }),
        )
        .then(
          ({
            data: {
              data: { url, id },
            },
          }) => ({ url, id }),
        );

      return s3ImgURL;
    });

  return fieldsData;
};
