import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Header } from '../../../Components/Commons/Header';
import ProfileImg from '../Components/ProfileImg';
import { TOKEN } from '../../Join/Atoms';
import { IsEditPwTap, IsEditNicknameTap } from '../Atoms';
import * as S from './styled';
import { Nickname, EditNickname } from '../Components/Nickname';
import Email from '../Components/Email';
import EditPwTap from '../Components/EditPwTap';

const Edit = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [isEditPwTap, setIsEditPwTap] = useRecoilState(IsEditPwTap);
  const [isEditNicknameTap, setEditNicknameTap] =
    useRecoilState(IsEditNicknameTap);
  console.log('token', token);
  return (
    <>
      <Header />
      <S.Container>
        <ProfileImg />
        {!isEditNicknameTap ? <Nickname /> : <EditNickname />}
        <Email />
        {!isEditPwTap ? (
          <button onClick={() => setIsEditPwTap(true)}>비밀번호 변경</button>
        ) : (
          <EditPwTap />
        )}
      </S.Container>
    </>
  );
};

export default Edit;
