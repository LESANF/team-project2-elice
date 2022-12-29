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
import * as SC from './styled';
import Dialog from '../../../Components/Commons/Dialog';
import { getUser } from '../../Edit/Utils';
import defaultProfile from '../../Edit/assets/defaultProfile.svg';
import { accessClient } from '../../../axiosInstance';

const PhotoPost = () => {
  const { postId } = useParams();
  const token = useRecoilState(TOKEN)[0];

  const { data, isLoading } = useQuery<any>(
    'postData',
    () => axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`),
    {
      refetchOnWindowFocus: false,
    },
  );

  const cameraRef = useRef<HTMLSelectElement>(null);
  const lensRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const commentListRef = useRef<any>([]);
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];
  const iconStyle = {
    color: '#07b8b8',
    size: 24,
  };

  // DialogFlag State
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [createFlag, setCreateFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [delCommentFlag, setDelCommentFlag] = useState(false);

  // data State
  const [getMyProfile, setGetMyProfile] = useState<any>('');
  const [defaultImg, setDefaultImg] = useState<any>('');
  const [delBtnId, setDelBtnId] = useState<any>(null);
  const [updateTxArea, setUpDateTxArea] = useState<any>('');

  useEffect(() => {
    setDefaultImg(defaultProfile);
    getUser(token).then((res) => {
      setGetMyProfile(res);
    });
  }, []);

  // 생성 Dialog Fn
  const agreeFnCreate = () => {
    setCreateFlag(false);
    return createFlag;
  };

  const disAgreeFnCreate = () => {
    setCreateFlag(false);
    return createFlag;
  };

  // 삭제 Dialog Fn
  const agreeFn = () => {
    setDeleteFlag(false);
    return deleteFlag;
  };

  const disAgreeFn = () => {
    setDeleteFlag(false);
    return deleteFlag;
  };

  // 수정 Dialog Fn
  const agreeFnUpdate = () => {
    setUpdateFlag(false);
    return updateFlag;
  };

  const disAgreeFnUpdate = () => {
    setUpdateFlag(false);
    return updateFlag;
  };

  // 댓글 삭제
  const handleDeleteComment = (e: any) => {
    const buttonId = e.target.getAttribute('id');
    setDelBtnId(buttonId);
    setDelCommentFlag(true);
  };

  const deleteComment = async () => {
    await accessClient(token)
      .delete(`${process.env.REACT_APP_API_BASE_URL}/comments/${delBtnId}`)
      .then((res) => {
        if (res.data.success) {
          setDelBtnId('');
          window.location.reload();
        }
      });
  };

  // 댓글 삭제 Dialog Fn
  const agreeFnDelete = () => {
    deleteComment();
    setDelCommentFlag(false);
    return delCommentFlag;
  };

  const disAgreeFnDelete = () => {
    setDelCommentFlag(false);
    return delCommentFlag;
  };

  // 댓글 생성
  const createComment = async () => {
    if (commentRef.current) {
      const content = commentRef.current!.value.toString();
      await accessClient(token)
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/posts/${data.data.data.images[0].postId}/comments`,
          { content },
        )
        .then((res) => {
          if (res.data.success) {
            commentRef.current!.value = '';
            window.location.reload();
          }
        });
    }
  };

  // 댓글 수정
  const updateComment = async (content: any, commentId: any) => {
    await accessClient(token)
      .put(`${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`, {
        content,
      })
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        }
      });
  };

  const handleUpdateComment = (id: any, commentId: any) => {
    const tx: any = document.getElementById(id);
    if (tx.value.length < 1) setUpdateFlag(true);
    else {
      updateComment(tx.value, commentId);
    }
  };

  const handleCreateComment = () => {
    if (commentRef.current!.value.length < 1) setCreateFlag(true);
    else createComment();
  };

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
                <SC.CommentWrapper>
                  {token !== null && (
                    <SC.CommentZone>
                      <SC.UserProfileBox>
                        <SC.UserProfileImg
                          src={
                            getMyProfile.image_url === null ||
                            getMyProfile.image_url === undefined
                              ? defaultImg
                              : getMyProfile.image_url
                          }
                          alt="profile_image"
                        />
                        <SC.UserNickName>
                          {getMyProfile.profile_nickname}
                        </SC.UserNickName>
                      </SC.UserProfileBox>
                      <SC.UserComment>
                        <SC.CommentTextArea ref={commentRef} />
                        <SC.CommentCreateBtn onClick={handleCreateComment}>
                          작성
                        </SC.CommentCreateBtn>
                        <Dialog
                          openFlag={createFlag}
                          title="알림"
                          content="댓글 내용이 없습니다"
                          agreeFn={agreeFnCreate}
                          disAgreeFn={disAgreeFnCreate}
                          agreeOnly
                          sizeW="300px"
                          sizeH="180px"
                        />
                      </SC.UserComment>
                    </SC.CommentZone>
                  )}
                  <SC.CommentLists token={token}>
                    {data.data.data.comments.map((v: any, i: number) => (
                      <SC.CommentItem key={v.content + i.toString()}>
                        <SC.UserProfileBox>
                          <SC.UserProfileImg
                            src={
                              (v.user.profiles.image &&
                                v.user.profiles.image.url) ||
                              defaultImg
                            }
                            alt="profile_image"
                          />

                          <SC.UserNickName>
                            {v.user.profiles.nickname}
                          </SC.UserNickName>
                        </SC.UserProfileBox>
                        <SC.UserComment>
                          <SC.CommentTextArea
                            id={`${v.id.toString()}tx`}
                            ref={commentListRef}
                            disabled={
                              !(
                                getMyProfile &&
                                v.user &&
                                getMyProfile.user_id === v.user.id
                              )
                            }
                            defaultValue={v.content}
                          />
                          {getMyProfile &&
                            v.user &&
                            getMyProfile.user_id === v.user.id && (
                              <>
                                <SC.CommentUpdateBtn
                                  id={v.id}
                                  onClick={() =>
                                    handleUpdateComment(
                                      `${v.id.toString()}tx`,
                                      v.id,
                                    )
                                  }
                                >
                                  수정
                                </SC.CommentUpdateBtn>
                                <Dialog
                                  openFlag={updateFlag}
                                  title="알림"
                                  content="댓글 내용이 없습니다"
                                  agreeFn={agreeFnUpdate}
                                  disAgreeFn={disAgreeFnUpdate}
                                  agreeOnly
                                  sizeW="300px"
                                  sizeH="180px"
                                />
                                <SC.CommentDeleteBtn
                                  id={v.id}
                                  onClick={handleDeleteComment}
                                >
                                  삭제
                                </SC.CommentDeleteBtn>
                                <Dialog
                                  openFlag={delCommentFlag}
                                  title="알림"
                                  content="댓글을 삭제하시겠습니까 ?"
                                  agreeFn={agreeFnDelete}
                                  disAgreeFn={disAgreeFnDelete}
                                  sizeW="300px"
                                  sizeH="180px"
                                />
                              </>
                            )}
                          <Dialog
                            openFlag={createFlag}
                            title="알림"
                            content="댓글 내용이 없습니다"
                            agreeFn={agreeFnCreate}
                            disAgreeFn={disAgreeFnCreate}
                            agreeOnly
                            sizeW="300px"
                            sizeH="180px"
                          />
                        </SC.UserComment>
                      </SC.CommentItem>
                    ))}
                  </SC.CommentLists>
                </SC.CommentWrapper>
              </S.Wrapper>
            </S.Container>
          </S.PostContainer>
          {getMyProfile!.user_id === data.data.data.user.id && (
            <S.PostFooter>
              <S.SubmitBtn onClick={() => setDeleteFlag(true)}>
                삭제
              </S.SubmitBtn>
              <Dialog
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
