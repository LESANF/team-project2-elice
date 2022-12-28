import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import MapDialogInput from '../../../Components/Commons/Dialog';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { FaCameraRetro } from 'react-icons/fa';
import { BsPinMapFill } from 'react-icons/bs';
import { RiCameraLensFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';
import Editor from '../../../Components/Commons/Editor';
import TagToolTip from '../Utils/Tooltip';
import SubmitDialog from '../../../Components/Commons/Dialog';
import { TOKEN } from '../../Join/Atoms';
import { accessClient } from '../../../axiosInstance';

interface IPhotoMetaData {
  takenAt: string;
  longitude: number;
  latitude: number;
}

interface ICompany {
  id: number | string;
  name: string;
}
interface IModel {
  id: number | string;
  companyId?: number;
  model: string;
}

interface IOption {
  value: number;
  label: string;
}

interface IPostFormData {
  title: string;
  content: string;
  imageUrlId: number;
  lensId: number | null;
  cameraId: number;
  latitude: number;
  longitude: number;
  locationInfo: string;
  takenAt: string;
  hashtags: string[];
}

const PostPhoto = () => {
  const token = useRecoilState(TOKEN)[0];
  console.log(token);
  const navigate = useNavigate();

  const titleRef = useRef<any>(null);
  const cameraRef = useRef<HTMLSelectElement>(null);
  const lensRef = useRef<HTMLSelectElement>(null);
  const cameraMdRef = useRef<HTMLSelectElement>(null);
  const lensMdRef = useRef<any>(null);
  const mapDesRef = useRef<any>(null);

  const [imgUrlId, setImgUrlId] = useState('');

  const [cameraComList, setCameraComList] = useState<ICompany[]>([
    { id: '', name: '회사를 선택해주세요' },
  ]);
  const [lensComList, setLensComList] = useState<ICompany[]>([
    { id: '', name: '회사를 선택해주세요' },
  ]);
  const [cameraModelLists, setCameraModelLists] = useState<IModel[]>([
    { id: '', model: '카메라 모델을 선택해주세요' },
  ]);
  const [lensModelLists, setlensModelLists] = useState<IModel[]>([
    { id: '', model: '렌즈를 선택해주세요' },
  ]);
  const quillRef = useRef<any>();
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [photoMetaData, setPhotoMetaData] = useState<IPhotoMetaData>();
  const [mapFlag, setMapFlag] = useState<boolean>(false);
  const [selCameraFlag, setSelCameraFlag] = useState<boolean>(false);
  const [selLensFlag, setLensFlag] = useState<boolean>(false);

  const [cameraComId, setCameraComId] = useState('');
  const [lensComId, setLensComId] = useState('');
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];

  const [flag, setFlag] = useState(false);

  const fetchPost = async (sendData: any) => {
    await accessClient(token).post(`/posts`, sendData);
  };

  const agreeFn = () => {
    const getlensId = () => {
      if (!lensMdRef.current) return null;
      return +lensMdRef.current!.value !== null
        ? +lensMdRef.current!.value
        : null;
    };

    const lensId = getlensId();
    const sendData: any = {
      title: titleRef.current.value.trim(),
      content: htmlContent,
      imageUrlId: imgUrlId,
      lensId,
      cameraId: cameraMdRef.current?.value,
      latitude: photoMetaData!.latitude,
      longitude: photoMetaData!.longitude,
      locationInfo: mapDesRef.current?.value,
      takenAt: photoMetaData!.takenAt,
      hashtags: tagList,
    };

    // const postFormData: any = new FormData();
    // postFormData.append('title', titleRef.current.value.trim());
    // if (quillRef.current) {
    //   // quill.clipboard.dangerouslyPasteHTML(1, `<img src=${url} alt="image" />`);
    //   const description = quillRef.current.getEditor().getText();
    //   const quill = quillRef.current.getEditor();
    //   // console.log('description: ', description);
    //   postFormData.append('content', htmlContent);
    //   sendData.content = htmlContent;
    // }
    // postFormData.append('imageUrlId', imgUrlId);
    // postFormData.append(
    //   'lensId',
    //   +lensMdRef.current!.value !== null ? +lensMdRef.current!.value : null,
    // );
    // postFormData.append('latitude', photoMetaData!.latitude);
    // postFormData.append('longitude', photoMetaData!.longitude);
    // postFormData.append('locationInfo', mapDesRef.current!.value);
    // postFormData.append('takenAt', photoMetaData!.takenAt);
    // postFormData.append('hashtags: ', tagList);
    fetchPost(sendData);
    console.log(sendData);
    setFlag(false);
    navigate('/menu/photolists');
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소asdasd');
    setFlag(false);
    return flag;
  };

  useQuery<any>(
    'cameraCompnay',
    () => axios.get(`http://34.64.34.184:5001/cameras/companies`),
    {
      onSuccess: ({ data: { data: cameraLists } }) => {
        setCameraComList((prev) => [...prev, ...cameraLists]);
      },
      refetchOnWindowFocus: false,
    },
  );
  useQuery<any>(
    'lensCompnay',
    () => axios.get(`http://34.64.34.184:5001/lenses/companies`),
    {
      onSuccess: ({ data: { data: lensLists } }) => {
        setLensComList((prev) => [...prev, ...lensLists]);
      },
      refetchOnWindowFocus: false,
    },
  );

  useQuery<any>(
    ['cameraModelLists', cameraComId],
    () =>
      axios.get(`http://34.64.34.184:5001/companies/${cameraComId}/cameras`),
    {
      onSuccess: ({ data: { data: cameraMdLists } }) => {
        setCameraModelLists([{ id: '', model: '카메라 모델을 선택해주세요' }]);
        setCameraModelLists((prev) => [...prev, ...cameraMdLists]);
        setSelCameraFlag(true);
      },
      refetchOnWindowFocus: false,
      enabled: !!Number(cameraComId),
    },
  );
  useQuery<any>(
    ['lensModelLists', lensComId],
    () => axios.get(`http://34.64.34.184:5001/companies/${lensComId}/lenses`),
    {
      onSuccess: ({ data: { data: lensMdLists } }) => {
        setlensModelLists([{ id: '', model: '렌즈를 선택해주세요' }]);
        setlensModelLists((prev) => [...prev, ...lensMdLists]);
        setLensFlag(true);
      },
      enabled: !!Number(lensComId),
      refetchOnWindowFocus: false,
    },
  );

  const setPhotoLocation = () => {
    console.log('위도경도 입력받기');
  };

  useEffect(() => {
    if (cameraComId === '1' || cameraComId === '2') {
      lensRef.current!.value = '';
      lensRef.current!.disabled = true;
      if (lensMdRef.current) {
        lensMdRef.current!.value = '';
        lensMdRef.current!.disabled = true;
      }
    } else {
      lensRef.current!.disabled = false;
      if (lensMdRef.current) lensMdRef.current!.disabled = false;
    }
  }, [cameraComId]);

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
    // console.log('title: ', titleRef.current.value);
    // console.log('imageUrlId', imgUrl);
    // console.log('lensId', +lensMdRef.current!.value);
    // console.log('cameraId', +cameraMdRef.current!.value);
    // console.log('latitude', photoMetaData!.latitude);
    // console.log('longitude', photoMetaData!.longitude);
    // console.log('takenAt', photoMetaData!.takenAt);
    // console.log('locationInfo', mapDesRef.current!.value);
    // console.log('hashtags: ', tagList);
    // if (quillRef.current) {
    //   // const range = quill.getSelection()?.index;
    //   // console.log(description);
    //   // console.log(htmlContent);
    //   // quill.clipboard.dangerouslyPasteHTML(1, `<img src=${url} alt="image" />`);
    //   const description = quillRef.current.getEditor().getText();
    //   const quill = quillRef.current.getEditor();
    //   console.log('description: ', description);
    //   console.log('content: ', htmlContent);
    // }
    // const quill = quillRef.current.getEditor();
    // quill.clipboard.dangerouslyPasteHTML(
    //   1,
    //   `<h2><span class="ql-size-huge" style="color: rgb(230, 0, 0);">asdasdasd</span><span class="ql-font-serif"><span class="ql-cursor"></span></span></h2>`,
    // );

    setFlag(true);
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

  const handleCameraComSel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCameraComId(value);
  };
  const handleLensComSel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setLensComId(value);
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
              <S.CameraCompany ref={cameraRef} onChange={handleCameraComSel}>
                {cameraComList.map((item, idx) => (
                  <option value={item.id} key={idx}>
                    {item.name}
                  </option>
                ))}
              </S.CameraCompany>
              {selCameraFlag && (
                <S.CameraSelectBox ref={cameraMdRef}>
                  {cameraModelLists.map((item, idx) => (
                    <option value={item.id} key={idx}>
                      {item.model}
                    </option>
                  ))}
                </S.CameraSelectBox>
              )}
            </S.CameraModelBox>
            <S.LensModelBox>
              <S.CameraIconBox>
                <RiCameraLensFill {...iconStyle} />
              </S.CameraIconBox>
              <S.LensCompany ref={lensRef} onChange={handleLensComSel}>
                {lensComList.map((item, idx) => (
                  <option value={item.id} key={idx}>
                    {item.name}
                  </option>
                ))}
              </S.LensCompany>
              {selLensFlag && (
                <S.CameraLens ref={lensMdRef}>
                  {lensModelLists.map((item, idx) => (
                    <option value={item.id} key={idx}>
                      {item.model}
                    </option>
                  ))}
                </S.CameraLens>
              )}
            </S.LensModelBox>
          </S.TitleWrapper>
          <S.ContentBox>
            <S.QuillEditor>
              <Editor
                setMetaData={setPhotoMetaData}
                quillRef={quillRef}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
                setImgUrl={setImgUrlId}
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
                  <S.DescriptionInput ref={mapDesRef} />
                </S.CurLoaction>
              </S.KaKaoMapWrapper>
            </S.MapWrapper>
          )}
        </S.Wrapper>
      </S.Container>
      <S.PostFooter>
        <S.SubmitBtn onClick={handleSubmit}>등록</S.SubmitBtn>
        <SubmitDialog
          openFlag={flag}
          title="등록"
          content="글을 등록하시겠습니까 ?"
          agreeFn={agreeFn}
          disAgreeFn={disAgreeFn}
          sizeW="300px"
          sizeH="180px"
        />
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
