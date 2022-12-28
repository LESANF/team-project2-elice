import { useState } from 'react';

import * as S from './styled';
import Default from '../Components/Default';
import Default2 from '../Components/Default2';
import EditName from '../Components/EditName';
import EditPw from '../Components/EditPw';
import { HeaderForPost } from '../../../Components/Commons/Header';

interface IState {
  EDITPW: string;
  EDITNAME: string;
  DEFAULT: string;
}
const state: IState = {
  EDITPW: 'EDITPW',
  EDITNAME: 'EDITNAME',
  DEFAULT: 'DEFAULT',
};

const Edit = () => {
  const [mode, setMode] = useState<string>(state.DEFAULT);

  return (
    <>
      <HeaderForPost />
      {mode === 'EDITNAME' ? <EditName setMode={setMode} /> : ''}
      {mode === 'EDITPW' ? (
        <>
          <Default2 setMode={setMode} />
          <EditPw setMode={setMode} />
        </>
      ) : (
        ''
      )}
      {mode === 'DEFAULT' ? (
        <>
          <Default setMode={setMode} />
          <S.PasswordChange
            onClick={() => {
              setMode('EDITPW');
            }}
          >
            비밀번호 변경
          </S.PasswordChange>
        </>
      ) : (
        ''
      )}
      <S.Copyright>© 2022 photolog, all rights reserved.</S.Copyright>
    </>
  );
};

export default Edit;
