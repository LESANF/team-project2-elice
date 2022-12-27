import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { client } from '../../../../axiosInstance';
import * as S from './styled';
import {
  validateEmail,
  warningEmail,
  state,
  IsfindpwDialog,
} from '../../Utils';
import { MODE } from '../../Atoms';

const FindPwTap = () => {
  const [mode, setMode] = useRecoilState(MODE);
  const [findpwstate, setFindPwState] = useState<string>(state.NORMAL);
  const [emailstate, setEmailState] = useState<string>(state.NORMAL);

  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);

  const changeEmailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    if (!validateEmail(emailInput)) {
      setEmailState(state.STRERROR);
    } else {
      setEmailState(state.SUCCESS);
      setEmail(emailInput);
    }
  };
  const clickFindPwHandler = async () => {
    if (!(emailstate === state.SUCCESS)) {
      console.log('다시');
      return;
    }
    try {
      const result = await client.post(`/auth/resetPassword`, {
        email,
      });
      setFindPwState(state.SUCCESS);
      setFlag(true);
      setFlag(true);
    } catch (err: any) {
      setFindPwState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setFlag(true);
    }
  };
  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    if (findpwstate === state.SUCCESS) setMode('login');

    return flag;
  };

  return (
    <>
      <S.InfoTop>가입되어 있는 이메일 주소를 입력해주세요</S.InfoTop>
      <S.Form>
        <div
          placeholder="이메일"
          className="title"
          onChange={changeEmailHandler}
        >
          이메일
        </div>
        <div>
          <input placeholder="이메일" onChange={changeEmailHandler} />
          <div>{warningEmail(emailstate)}</div>
        </div>
      </S.Form>

      <S.InfoBottom>
        <ul>
          <li>전송된 메일로 임시 비밀번호가 전송됩니다</li>
          <li>로그인 후 꼭 비밀번호를 변경해주세요</li>
        </ul>
      </S.InfoBottom>

      <S.Button onClick={clickFindPwHandler}>임시 비밀번호 전송</S.Button>
      <IsfindpwDialog
        flag={flag}
        tapstate={findpwstate}
        errorMessage={errorMessage}
        agreeFn={agreeFn}
      />
    </>
  );
};

export default FindPwTap;
