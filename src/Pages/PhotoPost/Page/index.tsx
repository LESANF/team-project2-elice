import axios from 'axios';
import Calendar from 'react-calendar';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { FaCameraRetro, FaMapMarkerAlt } from 'react-icons/fa';
import { RiCameraLensFill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { TOKEN } from '../../Join/Atoms';
import Spinner from '../../Home/Components/Spinner';
import { Header } from '../../../Components/Commons/Header';
import * as S from '../../Post/Page/styled';
import DeleteDialog from '../../../Components/Commons/Dialog';
import { getUser } from '../../Edit/Utils';
import defaultProfile from '../../assets/defaultProfile.svg';

const PhotoPost = () => {
  const { postId } = useParams();
  const token = useRecoilState(TOKEN)[0];
  const cameraRef = useRef<HTMLSelectElement>(null);
  const lensRef = useRef<HTMLSelectElement>(null);
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];
  const iconStyle = {
    color: '#07b8b8',
    size: 24,
  };
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [getMyProfile, setGetMyProfile] = useState<any>('');
  const [defaultImg, setDefaultImg] = useState('');

  useEffect(() => {
    setDefaultImg(defaultProfile);
    getUser(token).then((data) => {
      console.log(data);
      setGetMyProfile(data);
    });
  }, []);

  const agreeFn = () => {
    console.log('삭제');
    setDeleteFlag(false);
    return deleteFlag;
  };

  const disAgreeFn = () => {
    setDeleteFlag(false);
    return deleteFlag;
  };

  const { data, isLoading } = useQuery<any>(
    'postData',
    () => axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`),
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <>
          <S.PostContainer>
            <Header />
            <S.Container>
              <S.Wrapper>
                <S.TitleWrapper>
                  <S.TitleArea value={data.data.data.title} readOnly />
                  <S.BoxBorder />
                  <S.TagBox>
                    {data.data.data.hashtags.map((tagAttr: any) => (
                      <S.Tag
                        bgColor={tagColor[2]}
                        key={tagAttr.id.toString() + tagAttr.tag.name}
                      >
                        {tagAttr.tag.name}
                      </S.Tag>
                    ))}
                  </S.TagBox>
                  <S.CameraModelBox>
                    <S.IconBox>
                      <FaCameraRetro {...iconStyle} />
                    </S.IconBox>
                    <S.CameraCompany
                      ref={cameraRef}
                      value={data.data.data.images[0].cameraId}
                      disabled
                    >
                      <option value={data.data.data.images[0].cameraId}>
                        {data.data.data.images[0].camera.model}
                      </option>
                    </S.CameraCompany>
                  </S.CameraModelBox>
                  <S.LensModelBox>
                    <S.IconBox>
                      <RiCameraLensFill {...iconStyle} />
                    </S.IconBox>
                    {data.data.data.images[0].lensId === null && (
                      <S.LensCompany ref={lensRef} value="" disabled>
                        <option value="">없음</option>
                      </S.LensCompany>
                    )}
                    {data.data.data.images[0].lensId !== null && (
                      <S.CameraLens
                        ref={lensRef}
                        value={data.data.data.images[0].lensId}
                        disabled
                      >
                        <option
                          value={data.data.data.images[0].lensId}
                          disabled
                        >
                          {data.data.data.images[0].lens.model}
                        </option>
                      </S.CameraLens>
                    )}
                  </S.LensModelBox>
                </S.TitleWrapper>
                <S.ContentBox>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.data.data.content.replace(
                        '<img ',
                        '<img style="width: 704px;"',
                      ),
                    }}
                  />
                </S.ContentBox>
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
                    <Calendar
                      value={
                        new Date(data.data.data.images[0].takenAt.split('T')[0])
                      }
                    />
                  </S.CalendarWrapper>
                  <S.KaKaoMapWrapper>
                    <S.CurLoaction>
                      <Map
                        center={{
                          lat: data.data.data.images[0].latitude,
                          lng: data.data.data.images[0].longitude,
                        }}
                        style={{
                          width: '704px',
                          height: '304px',
                        }}
                        level={3}
                      >
                        <MapMarker
                          position={{
                            lat: data.data.data.images[0].latitude,
                            lng: data.data.data.images[0].longitude,
                          }}
                        />
                      </Map>
                      <S.DescriptionInput
                        value={data.data.data.images[0].locationInfo}
                        disabled
                      />
                    </S.CurLoaction>
                  </S.KaKaoMapWrapper>
                </S.MapWrapper>
              </S.Wrapper>
            </S.Container>
          </S.PostContainer>
          <img src={defaultImg} alt="default_img" />
          {getMyProfile!.user_id === data.data.data.user.id && (
            <S.PostFooter>
              <S.SubmitBtn onClick={() => setDeleteFlag(true)}>
                삭제
              </S.SubmitBtn>
              <DeleteDialog
                openFlag={deleteFlag}
                title="삭제"
                content="글을 삭제하시겠습니까?"
                agreeFn={agreeFn}
                disAgreeFn={disAgreeFn}
                sizeW="300px"
                sizeH="180px"
              />
            </S.PostFooter>
          )}
        </>
      )}
    </>
  );
};

export default PhotoPost;
