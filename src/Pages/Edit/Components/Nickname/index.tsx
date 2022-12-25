import { useRecoilState } from 'recoil';

import { useState } from 'react';
import * as S from './styled';
import { getUser } from '../../Utils';
import { TOKEN } from '../../../Join/Atoms/index';
import { IsEditNicknameTap } from '../../Atoms';

export const Nickname = () => {
  // 디폴트 모드
  const [isEditNicknameTap, setEditNicknameTap] =
    useRecoilState(IsEditNicknameTap);
  const [nickname, setNickname] = useState('');
  const [token, setToken] = useRecoilState(TOKEN);

  getUser(token).then((res) => setNickname(res.data.id)); //    일단 id로

  return (
    <>
      {nickname}
      <button onClick={() => setEditNicknameTap(true)}>닉네임 변경</button>
    </>
  );
};

export const EditNickname = () => {
  // 수정 모드
  const [isEditNicknameTap, setEditNicknameTap] =
    useRecoilState(IsEditNicknameTap);
  const [nickname, setNickname] = useState('');
  const [token, setToken] = useRecoilState(TOKEN);
  getUser(token).then((res) => setNickname(res.data.id)); //    일단 id로

  const changeHandler = (e: any) => {
    setNickname(e.target.value);
  };
  const clickHandler = () => {
    //  api 붙이기
    setEditNicknameTap(false);
  };
  return (
    <>
      <S.Nickname value={nickname} onChange={changeHandler} />
      <button onClick={clickHandler}>변경 완료</button>
    </>
  );
};
