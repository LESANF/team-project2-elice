import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FaCameraRetro, FaMapMarkerAlt } from 'react-icons/fa';
import { RiCameraLensFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Header } from '../../../Components/Commons/Header';
import * as S from './styled';
import Editor from '../../../Components/Commons/Editor';
import TagToolTip from '../Utils/Tooltip';
import SubmitDialog from '../../../Components/Commons/Dialog';
import { TOKEN } from '../../Join/Atoms';
import { accessClient } from '../../../axiosInstance';
import SelectMap from './SelectMap';
import 'react-calendar/dist/Calendar.css';
import { validationFunc } from '../Utils/Validation';

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

const PostPhoto = () => {
  const token = useRecoilState(TOKEN)[0];

  const navigate = useNavigate();

  const titleRef = useRef<any>();
  const cameraRef = useRef<HTMLSelectElement>(null);
  const lensRef = useRef<HTMLSelectElement>(null);
  const cameraMdRef = useRef<HTMLSelectElement>(null);
  const lensMdRef = useRef<any>();
  const mapDesRef = useRef<any>();
  const [imgUrlId, setImgUrlId] = useState<any>();

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
  const [htmlContent, setHtmlContent] = useState<any>();
  const [photoMetaData, setPhotoMetaData] = useState<IPhotoMetaData>();
  const [mapFlag, setMapFlag] = useState<boolean>(false);
  const [mapSelFlag, setMapSelFlag] = useState<boolean>(false);
  const [selCameraFlag, setSelCameraFlag] = useState<boolean>(false);
  const [selLensFlag, setLensFlag] = useState<boolean>(false);

  const [cameraComId, setCameraComId] = useState<any>();
  const [lensComId, setLensComId] = useState<any>();
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];

  const [flag, setFlag] = useState(false);
  const [flagLocation, setFlagLocation] = useState(false);
  const [sendCompleteFlag, setSendCompleteFlag] = useState(false);
  const [submitFinalFalg, setSubmitFinalFalg] = useState(false);
  const setLocationExist = useState<any>(false)[1];

  const [userLatitude, setUserLatitude] = useState<number>();
  const [userLongitude, setUserLongitude] = useState<number>();

  const [sendErrMsg, setSendErrMsg] = useState('데이터(을)를 입력해주세요');

  const [calValue, setCalValue] = useState<any>(new Date());
  const [sendData, setSendData] = useState<any>();

  const fetchPost = async (data: any) => {
    await accessClient(token).post(`/posts`, data);
  };

  const agreeFn = () => {
    const getlensId = () => {
      if (!lensMdRef.current) return null;
      return +lensMdRef.current!.value !== null
        ? +lensMdRef.current!.value
        : null;
    };

    const getcameraId = () => {
      if (!cameraMdRef.current) return null;
      return +cameraMdRef.current!.value !== null
        ? +cameraMdRef.current!.value
        : null;
    };

    const lensId = getlensId();
    const cameraId = getcameraId();

    const { result, errMsg }: { result: boolean; errMsg: string } =
      validationFunc({
        title: titleRef.current.value.trim(),
        content: htmlContent,
        imageUrlId: imgUrlId,
        lensId,
        cameraId,
        latitude: mapFlag ? photoMetaData!.latitude : userLatitude,
        longitude: mapFlag ? photoMetaData!.longitude : userLongitude,
        locationInfo: mapDesRef.current?.value,
        takenAt: new Date(calValue).toISOString(),
        hashtags: tagList,
      });

    if (result) {
      setSendData({
        title: titleRef.current.value.trim(),
        content: htmlContent,
        imageUrlId: imgUrlId,
        lensId,
        cameraId,
        latitude: mapFlag ? photoMetaData!.latitude : userLatitude,
        longitude: mapFlag ? photoMetaData!.longitude : userLongitude,
        locationInfo: mapDesRef.current?.value,
        takenAt: new Date(calValue).toISOString(),
        hashtags: tagList,
      });
      setSendCompleteFlag(true);
    } else {
      setSendErrMsg(errMsg);
      setSubmitFinalFalg(true);
    }

    setFlag(false);
    return flag;
  };

  const handleComplete = () => {
    fetchPost(sendData);
    setSendCompleteFlag(false);
    navigate('/menu/photolists');
    return sendCompleteFlag;
  };

  const disAgreeFn = () => {
    setFlag(false);
    return flag;
  };

  useQuery<any>(
    'cameraCompnay',
    () => axios.get(`${process.env.REACT_APP_API_BASE_URL}/cameras/companies`),
    {
      onSuccess: ({ data: { data: cameraLists } }) => {
        setCameraComList((prev) => [...prev, ...cameraLists]);
      },
      refetchOnWindowFocus: false,
    },
  );
  useQuery<any>(
    'lensCompnay',
    () => axios.get(`${process.env.REACT_APP_API_BASE_URL}/lenses/companies`),
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
      axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${cameraComId}/cameras`,
      ),
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
    () =>
      axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${lensComId}/lenses`,
      ),
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
    console.log(photoMetaData);
    if (
      photoMetaData?.latitude !== undefined &&
      photoMetaData?.longitude !== undefined &&
      photoMetaData?.latitude !== null &&
      photoMetaData?.longitude !== null
    ) {
      setLocationExist(false);
      setMapFlag(true);
      setMapSelFlag(false);
    } else if (flagLocation) {
      console.log('location data 없음.');
      setMapFlag(false);
    }
  }, [photoMetaData, flagLocation]);

  const handleSubmit = async () => {
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
      <S.PostContainer>
        <Header />
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
                <S.IconBox>
                  <FaCameraRetro {...iconStyle} />
                </S.IconBox>
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
                <S.IconBox>
                  <RiCameraLensFill {...iconStyle} />
                </S.IconBox>
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
                  setNoneLocation={setFlagLocation}
                  setCalValue={setCalValue}
                />
              </S.QuillEditor>
            </S.ContentBox>

            <SubmitDialog
              openFlag={flagLocation}
              title="알림"
              content="좌표 정보가 없습니다. 좌표를 입력해주세요"
              agreeFn={() => {
                setFlagLocation(false);
                setLocationExist(true);
                setMapSelFlag(true);
                return false;
              }}
              disAgreeFn={() => false}
              agreeOnly
              sizeW="350px"
              sizeH="200px"
            />
            {mapFlag && (
              <S.MapWrapper>
                <S.MapSectionBar>
                  <S.MapTitleLogoBox>
                    <S.IconBox>
                      <FaMapMarkerAlt {...iconStyle} />
                    </S.IconBox>
                    <S.MapTitleText>지도</S.MapTitleText>
                  </S.MapTitleLogoBox>
                </S.MapSectionBar>
                <S.CalendarWrapper>
                  <Calendar value={calValue} onChange={setCalValue} />
                </S.CalendarWrapper>
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
            {mapSelFlag && (
              <S.MapWrapper>
                <S.MapSectionBar>
                  <S.MapTitleLogoBox>
                    <S.IconBox>
                      <FaMapMarkerAlt {...iconStyle} />
                    </S.IconBox>
                    <S.MapTitleText>지도</S.MapTitleText>
                  </S.MapTitleLogoBox>
                </S.MapSectionBar>
                <S.CalendarWrapper>
                  <Calendar value={calValue} onChange={setCalValue} />
                </S.CalendarWrapper>
                <S.KaKaoMapWrapper>
                  <S.CurLoaction>
                    <SelectMap
                      userLatitude={userLatitude}
                      userLongitude={userLongitude}
                      setUserLatitude={setUserLatitude}
                      setUserLongitude={setUserLongitude}
                    />
                    <S.DescriptionInput ref={mapDesRef} />
                  </S.CurLoaction>
                </S.KaKaoMapWrapper>
              </S.MapWrapper>
            )}
          </S.Wrapper>
        </S.Container>
      </S.PostContainer>
      <S.PostFooter>
        <S.SubmitBtn onClick={handleSubmit}>등록</S.SubmitBtn>
        <SubmitDialog
          openFlag={flag}
          title="등록"
          content="글을 등록하시겠습니까?"
          agreeFn={agreeFn}
          disAgreeFn={disAgreeFn}
          sizeW="300px"
          sizeH="180px"
        />
        <SubmitDialog
          openFlag={submitFinalFalg}
          title="알림"
          content={sendErrMsg}
          agreeFn={() => {
            setSubmitFinalFalg(false);
            return submitFinalFalg;
          }}
          disAgreeFn={() => false}
          agreeOnly
          sizeW="300px"
          sizeH="180px"
        />
        <SubmitDialog
          openFlag={sendCompleteFlag}
          title="알림"
          content="글이 등록되었습니다"
          agreeFn={handleComplete}
          disAgreeFn={() => false}
          agreeOnly
          sizeW="300px"
          sizeH="180px"
        />
      </S.PostFooter>
    </>
  );
};

export default PostPhoto;
