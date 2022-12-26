import { motion } from 'framer-motion';
import { useState } from 'react';
import * as S from './styled';
import EditProfileTap from '../Components/EditProfileTap';
import EditPwTap from '../Components/EditPwTap';
import MyProfileTap from '../Components/MyProfileTap';
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
  MYPROFILE: JSX.Element;
  EDITPROFILE: JSX.Element;
  EDITPW: JSX.Element;
}

const stateTap: IStateTap = {
  MYPROFILE: <MyProfileTap />,
  EDITPROFILE: <EditProfileTap />,
  EDITPW: <EditPwTap />,
};
const Edit = () => {
  const [mode, setMode] = useState<string>(state.DEFAULT);
  const clickHandler = (evt: any) => {
    setMode(evt.target.className);
  };
  return (
    <>
      <HeaderForPost />
      {mode === 'DEFAULT' ? <Default setMode={setMode} /> : ''}
      {mode === 'EDITNAME' ? <EditName setMode={setMode} /> : ''}
      {mode === 'EDITPW' ? <EditPw setMode={setMode} /> : ''}
      <S.Copyright>© 2022 photolog, all rights reserved.</S.Copyright>
    </>
  );
};

export default Edit;
