import { motion } from 'framer-motion';
import axios from 'axios';

import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { LOCAL_URL, getUser, getPresignedURL } from '../../Utils';

import CustomizedTooltips from '../Tooltip/tooltip';
import * as S from './styled';
import defaultProfile from '../../assets/defaultProfile.svg';
import { TOKEN } from '../../../Join/Atoms';

interface IDefaultProps {
  setMode?: any;
  user?: any;
}
const Default = ({ setMode }: IDefaultProps) => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Image, setImage] = useState(defaultProfile);

  const fileInput = useRef<any>(null);

  getUser(token).then((res) => {
    setId(res.data.id);
    setName(res.data.id);
    setEmail(res.data.email);
  }); //    일단 id로

  const changeHandler = async (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const getS3UploadImg = await getPresignedURL(e.target.files[0]);
      console.log('getS3UploadImg', getS3UploadImg);
      axios
        .patch(
          `${LOCAL_URL}/profiles/image/${id}`,
          {
            ImageUrlId: getS3UploadImg,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then((res) => console.log('result', res))
        .catch((err) => console.log('err', err));
    } else {
      setImage(defaultProfile);
      return;
    }
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <S.Container>
      <motion.div layoutId="avatar">
        <CustomizedTooltips content="사진 변경">
          <S.Profile
            src={Image}
            alt="프로필 사진"
            onClick={() => {
              fileInput.current.click();
            }}
          />
        </CustomizedTooltips>
      </motion.div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={changeHandler}
        ref={fileInput}
      />
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
