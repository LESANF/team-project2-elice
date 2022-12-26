import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import CustomizedTooltips from '../Tooltip/tooltip';
import * as S from './styled';
import { ReactComponent as DefaultProfile } from '../../assets/defaultProfile.svg';
import { getUser } from '../../Utils';
import { TOKEN } from '../../../Join/Atoms';

interface IDefaultProps {
  setMode?: any;
  user?: any;
}
const Default = ({ setMode }: IDefaultProps) => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  getUser(token).then((res) => {
    setName(res.data.id);
    setEmail(res.data.email);
  }); //    일단 id로

  return (
    <S.Container>
      <motion.div layoutId="avatar">
        <CustomizedTooltips content="사진 변경">
          <DefaultProfile style={{ cursor: 'pointer' }} onClick={alert} />
        </CustomizedTooltips>
      </motion.div>
      <motion.div layoutId="nickname">
        <CustomizedTooltips content="닉네임 변경">
          <S.NickName
            onClick={() => {
              setMode('EDITNAME');
            }}
          >
            {name}
          </S.NickName>
        </CustomizedTooltips>
      </motion.div>
      <motion.div layoutId="email">
        <S.Email>{email}</S.Email>
      </motion.div>
    </S.Container>
  );
};

export default Default;
