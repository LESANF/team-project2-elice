import { useRecoilState } from 'recoil';

import { useState } from 'react';
import { getUser } from '../../Utils';
import { TOKEN } from '../../../Join/Atoms/index';
import * as S from './styled';

const Email = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [email, setEmail] = useState('');
  getUser(token).then((res) => setEmail(res.data.email)); //    일단 id로

  return <S.Email>{email}</S.Email>;
};
export default Email;
