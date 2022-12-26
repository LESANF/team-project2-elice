import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import * as S from './styled';
import DialogTest from '../../../../Components/Commons/Dialog';
import {
  validateEmail,
  validatePw,
  warningEmail,
  warningPw,
  state,
  LOCAL_URL,
} from '../../Utils';
import { TOKEN } from '../../Atoms';

const FindPwTap = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(TOKEN);

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
  const clickLoginHandler = async () => {
    if (!(emailstate === state.SUCCESS)) {
      console.log('다시');
      return;
    }
    try {
      const result = await axios.post(
        `${LOCAL_URL}/auth/resetPassword`,
        {
          email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setFindPwState(state.SUCCESS);
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
    if (findpwstate === state.SUCCESS) navigate(`/`);

    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    if (findpwstate === state.SUCCESS) navigate(`/`);

    return flag;
  };

  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (findpwstate === state.SUCCESS) {
      [title, content] = [
        `임시비밀번호 전송 완료`,
        `임시비밀번호가 정상적으로 전송되었습니다`,
      ];
    } else {
      title = '임시비밀번호 전송 오류';
      [title, content] = ['임시비밀번호 전송 오류', errorMessage];
    }
    return (
      <DialogTest
        openFlag={flag}
        title={title}
        content={content}
        agreeFn={agreeFn}
        disAgreeFn={disAgreeFn}
        sizeW="700px"
        sizeH="300px"
      />
    );
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

      <S.Button onClick={clickLoginHandler}>임시 비밀번호 전송</S.Button>
    </>
  );
};

export default FindPwTap;
