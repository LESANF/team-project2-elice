import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  SetStateAction,
} from 'react';
import axios from 'axios';
import EXIF from 'exif-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPresignedURL } from '../../../Pages/Post/Apis';
import DupDialog from '../Dialog';

interface IQuillProps {
  quillRef: any;
  htmlContent: string;
  setHtmlContent: React.Dispatch<SetStateAction<string>>;
  setMetaData: any;
  setImgUrl: React.Dispatch<SetStateAction<string>>;
  setNoneLocation: any;
  setCalValue: React.Dispatch<SetStateAction<Date | string>>;
}

const Editor = ({
  quillRef,
  htmlContent,
  setHtmlContent,
  setMetaData,
  setImgUrl,
  setNoneLocation,
  setCalValue,
}: IQuillProps) => {
  const [finalLo, setFinalLo] = useState<number>();
  const [finalLa, setFinalLa] = useState<number>();
  const [finalTakenAt, setFinalTakenAt] = useState<string>();
  const [dupFlag, setDupFlag] = useState(false);

  useEffect(() => {
    setMetaData({
      takenAt: finalTakenAt,
      longitude: finalLo,
      latitude: finalLa,
    });
  }, [finalLa, finalLo, finalTakenAt]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpg');
    input.setAttribute('name', 'image');
    input.click();

    input.onchange = async () => {
      setFinalLo(undefined);
      setFinalLa(undefined);
      setFinalTakenAt(undefined);
      setCalValue(new Date());

      const [file]: any = input.files;
      const { url: imgUrl, id: imgId } = await getPresignedURL(file);

      setImgUrl(imgId);

      const quill = quillRef.current.getEditor();

      const range = quillRef.current.getEditorSelection();
      quill.insertEmbed(range.index, 'image', imgUrl);
      quill.setSelection(range.index + 1);

      if (file) {
        const fileInfo: any = file;

        EXIF.getData(fileInfo, () => {
          const tags = EXIF.getAllTags(fileInfo);
          const longitude = tags.GPSLongitude;
          const longitudeRef = tags.GPSLongitudeRef;
          const latitude = tags.GPSLatitude;
          const latitudeRef = tags.GPSLatitudeRef;

          let takenTime = tags.DateTimeDigitized;
          if (takenTime) {
            for (let i = 0; i <= 1; i++)
              takenTime = takenTime.replace(':', '-');

            const changeDate = new Date(takenTime).toISOString().split('T')[0];
            setCalValue(new Date(changeDate));

            setFinalTakenAt(new Date(takenTime).toISOString());
          }

          if (longitude && longitudeRef && latitude && latitudeRef) {
            // 위도 latitude, 경도 longitude
            if (latitudeRef === 'S')
              setFinalLa(
                -1 * latitude[0] +
                  (-60 * latitude[1] + -1 * latitude[2]) / 3600,
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
          } else {
            setNoneLocation(true);
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

  const handleQuillChange = (value: any) => {
    const duplicationString = value;
    let count = 0;
    let position = duplicationString.indexOf('<img');

    while (position !== -1) {
      count++;
      position = duplicationString.indexOf('<img', position + 1);
    }

    if (count < 2) {
      setHtmlContent(value);
    } else {
      setDupFlag(true);
    }
  };

  return (
    <>
      <ReactQuill
        style={{ height: '500px', width: '706px' }}
        modules={modules}
        ref={quillRef}
        placeholder="Photolog에 기록해 보세요 !"
        value={htmlContent}
        onChange={setHtmlContent}
        theme="snow"
      />
      <DupDialog
        openFlag={dupFlag}
        title="알림"
        content="사진은 한장만 등록 가능합니다"
        agreeFn={() => {
          setDupFlag(false);
          return false;
        }}
        disAgreeFn={() => false}
        agreeOnly
        sizeW="350px"
        sizeH="200px"
      />
    </>
  );
};
export default Editor;
