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
      <CustomizedTooltips content="사진 변경">
        <motion.div layoutId="avatar">
          <DefaultProfile style={{ cursor: 'pointer' }} onClick={alert} />
        </motion.div>
      </CustomizedTooltips>
      <CustomizedTooltips content="닉네임 변경">
        <motion.div layoutId="nickname">
          <S.NickName
            onClick={() => {
              setMode('EDITNAME');
            }}
          >
            유저닉네임
          </S.NickName>
        </motion.div>
      </CustomizedTooltips>
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
