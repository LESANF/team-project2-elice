import { useState } from 'react';
import { useRecoilState } from 'recoil';

import * as S from './styled';
import Default from '../Components/Default';
import Default2 from '../Components/Default2';
import EditName from '../Components/EditName';
import EditPw from '../Components/EditPw';
import { HeaderForPost } from '../../../Components/Commons/Header';
import { deleteUserHandler, IsDeleteDialog, state } from '../Utils';
import { TOKEN } from '../../Join/Atoms';

const Edit = () => {
  const [mode, setMode] = useState<string>(state.DEFAULT);
  const [token, setToken] = useRecoilState(TOKEN);
  const [flag, setFlag] = useState(false);

  const agreeFn = () => {
    console.log('확인');
    deleteUserHandler(token, setToken);
    setFlag(false);
    setMode('DEFAULT');
    return flag;
  };

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
      <S.UserDelete onClick={() => setFlag(true)}>탈퇴하기</S.UserDelete>
      <S.Copyright>© 2022 photolog, all rights reserved.</S.Copyright>
      <IsDeleteDialog flag={flag} agreeFn={agreeFn} />
    </>
  );
};

export default Edit;
