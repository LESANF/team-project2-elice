import { motion } from 'framer-motion';
import { useState } from 'react';
import CustomizedTooltips from '../Tooltip/tooltip';
import * as S from './styled';
import { ReactComponent as DefaultProfile } from '../../assets/defaultProfile.svg';

interface IDefaultProps {
  setMode?: any;
}
const Default = ({ setMode }: IDefaultProps) => {
  console.log('default');
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
            유저닉네임
          </S.NickName>
        </CustomizedTooltips>
      </motion.div>
      <motion.div layoutId="email">
        <S.Email>photolog@naver.com</S.Email>
      </motion.div>
      <S.PasswordChange
        onClick={() => {
          setMode('EDITPW');
        }}
      >
        비밀번호 변경
      </S.PasswordChange>
    </S.Container>
  );
};

export default Default;
