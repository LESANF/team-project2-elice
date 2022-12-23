import axios from 'axios';
import EXIF from 'exif-js';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IQuillProps {
  quillRef: any;
  htmlContent: any;
  setHtmlContent: any;
}

const Editor = ({ quillRef, htmlContent, setHtmlContent }: IQuillProps) => {
  const imageHandler = () => {
    // http://localhost:5001/photos/presigned-url?filetype=jpg
    // https://photolog-bucket.s3.amazonaws.com/ (signURL)

    const formData = new FormData();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', 'image');
    input.click();

    /**
     * Image Upload API
     * 로컬로 하는 방법과달리 S3를 이용하여 진행하기 때문에
     * 별도의 로직이 필요
     */
    input.onchange = async () => {
      const file = input.files;
      if (file) {
        // http://localhost:5001/photos/presigned-url?filetype=jpg
        // https://photolog-bucket.s3.amazonaws.com/ (signURL)
        // formData.append('key', file[0]);
        // formData.append('bucket', file[0]);
        // formData.append('X-Amz-Algorithm', file[0]);
        // formData.append('image', file[0]);
        // formData.append('image', file[0]);
        // formData.append('image', file[0]);
        // formData.append('image', file[0]);
        // formData.append('image', file[0]);
        const fileInfo: any = file[0];

        EXIF.getData(fileInfo, () => {
          const tags = EXIF.getAllTags(fileInfo);
          console.log(tags.Artist);
          console.log(tags.Orientation);

          // 모든 키와 해당 키의 값 얻기
          for (const key in tags) {
            console.log(key);
            console.log(tags[key]);
          }
        });
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }, { color: [] }],
          ['underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <ReactQuill
      style={{ height: '500px', width: '706px' }}
      modules={modules}
      ref={quillRef}
      placeholder="Photolog에 기록해 보세요 !"
      value={htmlContent}
      onChange={setHtmlContent}
      theme="snow"
    />
  );
};
export default Editor;
