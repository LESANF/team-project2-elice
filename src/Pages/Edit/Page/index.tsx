import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Header } from '../../../Components/Commons/Header';
import ProfileImg from '../Components/ProfileImg';
import { TOKEN } from '../../Join/Atoms';
import { IsEditPwTap } from '../Atoms';
import * as S from './styled';
import Nickname from '../Components/Nickname';
import Email from '../Components/Email';
import EditPwTap from '../Components/EditPwTap';

const Edit = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [isEditPwTap, setIsEditPwTap] = useRecoilState<boolean>(IsEditPwTap);
  console.log('iseditpwtap', isEditPwTap);
  return (
    <>
      <Header />
      <S.Container>
        <ProfileImg />
        <Nickname />
        <Email />
        {!isEditPwTap ? (
          <button
            onClick={() => {
              setIsEditPwTap(true);
              console.log(isEditPwTap);
            }}
          >
            비밀번호 변경
          </button>
        ) : (
          <EditPwTap />
        )}
      </S.Container>
    </>
  );
};

export default Edit;
