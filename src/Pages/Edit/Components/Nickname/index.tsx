import { useRecoilState } from 'recoil';

import { useState } from 'react';
import * as S from './styled';
import { getUser } from '../../Utils';
import { TOKEN } from '../../../Join/Atoms/index';

const Nickname = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickname, setNickname] = useState('');
  getUser(token).then((res) => setNickname(res.data.id)); //    일단 id로

  return <S.Nickname>{nickname}</S.Nickname>;
};
export default Nickname;
