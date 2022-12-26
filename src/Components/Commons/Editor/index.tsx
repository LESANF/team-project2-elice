import axios from 'axios';
import EXIF from 'exif-js';

import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPresignedURL } from '../../../Pages/Post/Apis';

interface IQuillProps {
  quillRef: any;
  htmlContent: any;
  setHtmlContent: any;
  setMetaData: any;
}

const Editor = ({
  quillRef,
  htmlContent,
  setHtmlContent,
  setMetaData,
}: IQuillProps) => {
  const [finalLo, setFinalLo] = useState<number | null>(null);
  const [finalLa, setFinalLa] = useState<number | null>(null);
  const [cameraModel, setCameraModel] = useState<string | null>(null);

  useEffect(() => {
    setMetaData({ model: cameraModel, longitude: finalLo, latitude: finalLa });
  }, [finalLa, finalLo, cameraModel]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpg');
    input.setAttribute('name', 'image');
    input.click();

    input.onchange = async () => {
      const [file]: any = input.files;
      const getS3UploadImg = await getPresignedURL(file);
      const range = quillRef.current.getEditorSelection();
      quillRef.current
        .getEditor()
        .insertEmbed(range.index, 'image', getS3UploadImg);
      quillRef.current.getEditor().setSelection(range.index + 1);

      if (file) {
        const fileInfo: any = file;

        EXIF.getData(fileInfo, () => {
          const tags = EXIF.getAllTags(fileInfo);
          const model = tags.Model;
          const longitude = tags.GPSLongitude;
          const longitudeRef = tags.GPSLongitudeRef;
          const latitude = tags.GPSLatitude;
          const latitudeRef = tags.GPSLatitudeRef;

          setCameraModel(model);

          // 위도 latitude, 경도 longitude
          if (latitudeRef === 'S')
            setFinalLa(
              -1 * latitude[0] + (-60 * latitude[1] + -1 * latitude[2]) / 3600,
            );
          if (latitudeRef === 'N')
            setFinalLa(latitude[0] + (60 * latitude[1] + latitude[2]) / 3600);

          if (longitudeRef === 'W')
            setFinalLo(
              -1 * longitude[0] +
                (-60 * longitude[1] + -1 * longitude[2]) / 3600,
            );
          if (longitudeRef === 'E')
            setFinalLo(
              longitude[0] + (60 * longitude[1] + longitude[2]) / 3600,
            );
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
