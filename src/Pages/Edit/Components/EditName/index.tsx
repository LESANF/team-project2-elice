import { motion } from 'framer-motion';
import * as S from './styled';
import { MuiButton } from '../../../../Components/Commons/Header/styled';
import { ReactComponent as DefaultProfile } from '../../assets/defaultProfile.svg';

interface IEditNameProps {
  setMode?: any;
}

const EditName = ({ setMode }: IEditNameProps) => {
  console.log('name');
  return (
    <S.Container>
      <motion.div layoutId="avatar">
        <DefaultProfile />
      </motion.div>
      <S.NickName placeholder="새로운 닉네임을 적어주세요" />
      <div>
        <MuiButton
          style={{ width: '93px', marginTop: '22px;' }}
          textColor="#07B8B8"
          hoverBackgroundColor="#f9f9f9"
          onClick={() => {
            setMode('DEFAULT');
          }}
        >
          취소
        </MuiButton>
        <MuiButton
          style={{ marginLeft: '24px' }}
          textColor="#ffffff"
          backgroundColor="#07B8B8"
          hoverBackgroundColor="#00A8A7"
        >
          수정 완료
        </MuiButton>
      </div>
    </S.Container>
  );
};
EditName.defaultProps = {
  setMode: () => {},
};
export default EditName;
