//  충우님 코드
import { motion } from 'framer-motion';
import { useState } from 'react';

import * as S from './styled';
import EditProfileTap from '../Components/EditProfileTap';

import Default from '../Components/Default';
import EditName from '../Components/EditName';
import EditPw from '../Components/EditPw';
import { HeaderForPost } from '../../../Components/Commons/Header';
import { ReactComponent as DefaultProfile } from '../assets/defaultProfile.svg';

interface IState {
  MYPROFILE: string;
  EDITPROFILE: string;
  EDITPW: string;
  EDITNAME: string;
  DEFAULT: string;
}
const state: IState = {
  MYPROFILE: 'MYPROFILE',
  EDITPROFILE: 'EDITPROFILE',
  EDITPW: 'EDITPW',
  EDITNAME: 'EDITNAME',
  DEFAULT: 'DEFAULT',
};

interface IStateTap {
  [index: string]: JSX.Element;
  EDITPROFILE: JSX.Element;
}

const stateTap: IStateTap = {
  EDITPROFILE: <EditProfileTap />,
};

const Edit = () => {
  const [mode, setMode] = useState<string>(state.DEFAULT);

  return (
    <>
      <HeaderForPost />
      {mode === 'EDITNAME' ? (
        <EditName setMode={setMode} />
      ) : (
        <Default setMode={setMode} />
      )}
      {mode === 'EDITPW' ? (
        <EditPw setMode={setMode} />
      ) : (
        <S.PasswordChange
          onClick={() => {
            setMode('EDITPW');
          }}
        >
          비밀번호 변경
        </S.PasswordChange>
      )}
      <S.Copyright>© 2022 photolog, all rights reserved.</S.Copyright>
    </>
  );
};

export default Edit;
