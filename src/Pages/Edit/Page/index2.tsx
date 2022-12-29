//채현 코드
import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import * as S from './styled';
import Default from '../Components/Default';
import Default2 from '../Components/Default2';
import EditName from '../Components/EditName';
import EditPw from '../Components/EditPw';
import { HeaderForPost } from '../../../Components/Commons/Header';
import { deleteUserHandler, IsDeleteDialog, state, getUser } from '../Utils';
import { TOKEN } from '../../Join/Atoms';
import defaultProfile from '../assets/defaultProfile.svg';
import CustomizedTooltips from '../Components/Tooltip/tooltip';

import {
  accessClient,
  client,
  getprofilePresignedURL,
} from '../../../axiosInstance';
import { editMODE } from '../Atoms';

const Edit = () => {
  const [mode, setMode] = useRecoilState(editMODE);
  const [token, setToken] = useRecoilState(TOKEN);
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Image, setImage] = useState('');

  const fileInput = useRef<any>(null);
  useEffect(() => {
    getUser(token).then((res) => {
      setImage(res.image_url || defaultProfile);
      setName(res.profile_nickname);
      setEmail(res.user_email);
    });
  }, []);

  const changeHandler = async (e: any) => {
    if (e.target.files[0]) {
      const getS3UploadImg = await getprofilePresignedURL(e.target.files[0]);
      console.log('getprofilePresignedURL', getS3UploadImg);
      const resultId = await client
        .post(`photos`, {
          url: getS3UploadImg,
        })
        .then((res) => res.data.data.id);

      accessClient(token)
        .put(`profiles/image/${resultId}`)
        .then((res) => console.log('result', res))
        .catch((err) => console.log('err', err));
      setImage(getS3UploadImg);
    } else {
      setImage(defaultProfile);
    }
  };
  const agreeFn = () => {
    console.log('확인');
    deleteUserHandler(token, setToken);
    setFlag(false);
    setMode('DEFAULT');
    return flag;
  };
  const disagreeFn = () => {
    console.log('취소');
    setFlag(false);
    setMode('DEFAULT');
    return flag;
  };

  return (
    <>
      <HeaderForPost />

      <S.Container>
        <CustomizedTooltips content="사진 변경">
          <S.Profile
            src={Image}
            alt="프로필 사진"
            onClick={() => {
              fileInput.current.click();
            }}
          />
        </CustomizedTooltips>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={changeHandler}
          ref={fileInput}
        />

        {mode === 'EDITNAME' ? (
          <EditName />
        ) : (
          <CustomizedTooltips content="닉네임 변경">
            <S.NickName
              onClick={() => {
                setMode('EDITNAME');
              }}
            >
              {name}
            </S.NickName>
          </CustomizedTooltips>
        )}

        <S.Email>{email}</S.Email>
      </S.Container>
      {mode === 'EDITPW' ? (
        <EditPw />
      ) : (
        <S.PasswordChange
          onClick={() => {
            setMode('EDITPW');
          }}
        >
          비밀번호 찾기
        </S.PasswordChange>
      )}
      <S.UserDelete onClick={() => setFlag(true)}>탈퇴하기</S.UserDelete>
      <S.Copyright>© 2022 photolog, all rights reserved.</S.Copyright>
      <IsDeleteDialog flag={flag} agreeFn={agreeFn} disagreeFn={disagreeFn} />
    </>
  );
};

export default Edit;
