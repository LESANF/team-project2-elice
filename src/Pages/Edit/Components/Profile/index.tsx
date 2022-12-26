import { motion } from 'framer-motion';

// import * as S from './styled';
import CustomizedTooltips from '../Tooltip/tooltip';
import { ReactComponent as DefaultProfile } from '../../assets/defaultProfile.svg';

const Profile = () => {
  return (
    <>
      <motion.div layoutId="avatar">
        <CustomizedTooltips content="사진 변경">
          <DefaultProfile style={{ cursor: 'pointer' }} onClick={alert} />
        </CustomizedTooltips>
      </motion.div>
    </>
  );
};
