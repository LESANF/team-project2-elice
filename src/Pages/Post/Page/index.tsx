import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import MapDialogInput from '../../../Components/Commons/Dialog';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { FaCameraRetro } from 'react-icons/fa';
import { BsPinMapFill } from 'react-icons/bs';
import * as S from './styled';
import Editor from '../../../Components/Commons/Editor';
import TagToolTip from '../Utils/Tooltip';

interface IPhotoMetaData {
  model: string;
  longitude: number;
  latitude: number;
}

const PostPhoto = () => {
  const titleRef = useRef<any>(null);
  const quillRef = useRef<any>();
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState('');
  const [photoMetaData, setPhotoMetaData] = useState<IPhotoMetaData>();
  const [mapFlag, setMapFlag] = useState<boolean>(false);
  const [selCameraFlag, setSelCameraFlag] = useState<boolean>(false);
  const [selLensFlag, setLensFlag] = useState<boolean>(false);
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];

  const setPhotoLocation = () => {
    console.log('위도경도 입력받기');
  };

  useEffect(() => {
    if (
      photoMetaData?.latitude !== undefined &&
      photoMetaData?.longitude !== undefined &&
      photoMetaData?.latitude !== null &&
      photoMetaData?.longitude !== null
    ) {
      console.log(photoMetaData?.latitude);
      console.log(photoMetaData?.longitude);
      setMapFlag(true);
    } else {
      setPhotoLocation();
      setMapFlag(false);
    }
  }, [photoMetaData]);

  const handleSubmit = async () => {
    console.log('title: ', titleRef.current.value);
    console.log('imageUrlId', '---');
    console.log('lensId', '---');
    console.log('cameraId', '---');
    console.log('latitude', photoMetaData!.latitude);
    console.log('longitude', photoMetaData!.longitude);
    console.log('locationInfo', '위치정보 소개');
    console.log('hashtags: ', tagList.join(','));
    if (quillRef.current) {
      // const range = quill.getSelection()?.index;
      // console.log(description);
      // console.log(htmlContent);
      // quill.clipboard.dangerouslyPasteHTML(1, `<img src=${url} alt="image" />`);
      const description = quillRef.current.getEditor().getText();
      const quill = quillRef.current.getEditor();
      console.log('description: ', description);
      console.log('content: ', htmlContent);
    }

    // const quill = quillRef.current.getEditor();
    // quill.clipboard.dangerouslyPasteHTML(
    //   1,
    //   `<h2><span class="ql-size-huge" style="color: rgb(230, 0, 0);">asdasdasd</span><span class="ql-font-serif"><span class="ql-cursor"></span></span></h2>`,
    // );
  };

  const duplicateCheck = (value: string) => tagList.includes(value);

  const createTag = (value: string, type?: string) => {
    const regex = /[,]/gi;

    if (regex.test(value)) {
      const tag = value.replaceAll(',', '');
      if (tag.length < 1) return;
      if (duplicateCheck(tag)) {
        setTagInputValue('');
        return;
      }
      setTagList((prev) => {
        let ary = [...prev];
        ary = [...prev, tag];
        return ary;
      });
      setTagInputValue('');
    }

    if (type === 'enter') {
      if (value.length < 1) return;
      if (duplicateCheck(value)) {
        setTagInputValue('');
        return;
      }
      setTagList((prev) => {
        let ary = [...prev];
        ary = [...prev, value];
        return ary;
      });
      setTagInputValue('');
    }
  };

  const removeTag = (tagName: string) => {
    const newAry = [...tagList];
    setTagList(newAry.filter((tag) => tag !== tagName));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /[,]/gi;
    if (!regex.test(value)) setTagInputValue(value);
    createTag(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (tagInputRef.current) createTag(tagInputRef.current.value, 'enter');
    }
  };

  const iconStyle = {
    color: '#07b8b8',
    size: 24,
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.TitleWrapper>
            <S.TitleArea ref={titleRef} />
            <S.BoxBorder />
            <S.TagBox>
              {tagList &&
                tagList.map((tagName: string, index: number) => (
                  <S.Tag
                    key={index.toString() + tagName}
                    onClick={() => removeTag(tagName)}
                    bgColor={tagColor[2]}
                  >
                    {tagName}
                  </S.Tag>
                ))}
              <TagToolTip title="쉼표 혹은 엔터를 이용하여 태그를 등록할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다.">
                <S.TagInput
                  ref={tagInputRef}
                  value={tagInputValue}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </TagToolTip>
            </S.TagBox>
            <S.CameraModelBox>
              <S.CameraIconBox>
                <FaCameraRetro {...iconStyle} />
              </S.CameraIconBox>
              <S.CameraCompany />
              {selCameraFlag && <S.CameraSelectBox />}
              {selLensFlag && <S.CameraLens />}
            </S.CameraModelBox>
          </S.TitleWrapper>
          <S.ContentBox>
            <S.QuillEditor>
              <Editor
                setMetaData={setPhotoMetaData}
                quillRef={quillRef}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
              />
            </S.QuillEditor>
          </S.ContentBox>

          {mapFlag && (
            <S.MapWrapper>
              <S.MapSectionBar>
                <S.MapTitleLogoBox>
                  <BsPinMapFill style={{ marginRight: '10px' }} />
                  지도
                </S.MapTitleLogoBox>
              </S.MapSectionBar>
              <S.KaKaoMapWrapper>
                <S.CurLoaction>
                  <Map
                    center={{
                      lat: photoMetaData!.latitude,
                      lng: photoMetaData!.longitude,
                    }}
                    style={{
                      width: '704px',
                      height: '304px',
                    }}
                    level={3}
                  >
                    <MapMarker
                      position={{
                        lat: photoMetaData!.latitude,
                        lng: photoMetaData!.longitude,
                      }}
                    />
                  </Map>
                </S.CurLoaction>
              </S.KaKaoMapWrapper>
            </S.MapWrapper>
          )}
        </S.Wrapper>
      </S.Container>
      <S.PostFooter>
        <S.SubmitBtn onClick={handleSubmit}>등록</S.SubmitBtn>
        <S.SubmitBtn
          onClick={() => {
            if (selCameraFlag === true) {
              setLensFlag(true);
            }
            setSelCameraFlag(true);
          }}
        >
          값 테스트
        </S.SubmitBtn>
      </S.PostFooter>
    </>
  );
};

export default PostPhoto;
