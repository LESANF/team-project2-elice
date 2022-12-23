import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from './styled';
import DialogTest from '../../../../Components/Commons/Dialog';
import { userState } from '../../../Join/Atoms';
import { validatePw, warningPw, IsExist, state } from '../../../Join/Utils';

const EditPwTap = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [pw, setPw] = useState('');
  const [pwconfirm, setPwConfirm] = useState('');
  const [pwstate, setPwState] = useState(state.NORMAL);
  const [pwconfirmstate, setPwConfirmState] = useState(state.NORMAL);
  const [editpwstate, setEditPwState] = useState(state.NORMAL);
  const [flag, setFlag] = useState<boolean>(false);

  //  새 비번 input onChange
  const changePwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    console.log(pwInput);
    setPw(pwInput);
    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
    }
  };
  //  새 비번 확인 input onChange
  const changePwConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwconfirmInput = e.target.value;
    setPwConfirm(pwconfirmInput);
    console.log(pwconfirmInput, pw);

    if (pwconfirmInput !== pw) {
      setPwConfirmState(state.NONCONFIRMERROR);
    } else {
      setPwConfirmState(state.SUCCESS);
    }
  };

  // 비밀번호 변경 버튼
  const clickEditPwHandler = async () => {
    if (pwstate === state.SUCCESS && pwconfirmstate === state.SUCCESS) {
      const result = await axios.patch(
        `http://localhost:3232/users/${user.id}`,
        {
          password: pw,
        },
      );
      // console.log('토큰', result.data.accessToken);
      console.log(result);

      setEditPwState(state.SUCCESS);
      setFlag(true);
    } else {
      setEditPwState(state.ERROR);
      setFlag(true);
    }
  };

  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    if (editpwstate === state.SUCCESS) navigate(`/`);
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    if (editpwstate === state.SUCCESS) navigate(`/`);
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (editpwstate === state.SUCCESS) {
      [title, content] = [
        `${user.nickname}님`,
        `비밀번호 변경이 정상적으로 이루어졌습니다`,
      ];
    } else {
      //  일단 이렇게 해둠
      [title, content] = [
        `비밀번호 변경 오류`,
        `비밀번호가 정상적으로 변경되지 않았습니다.`,
      ];
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
      <S.Form>
        <div className="title">새 비밀번호</div>
        <div>
          <input type="password" onChange={changePwHandler} />
          <div>{warningPw(pwstate)}</div>
        </div>
      </S.Form>
      <S.Form>
        <div className="title">새 비밀번호 확인</div>
        <div>
          <input type="password" onChange={changePwConfirmHandler} />
          <div>{warningPw(pwconfirmstate)}</div>
        </div>
      </S.Form>
      <S.Button onClick={clickEditPwHandler}>비밀번호 변경</S.Button>
      {dialog()}
    </>
  );
};

export default EditPwTap;
