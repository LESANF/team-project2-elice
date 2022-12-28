import { motion } from 'framer-motion';

import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from '../../Utils';

import CustomizedTooltips from '../Tooltip/tooltip';
import * as S from './styled';
import defaultProfile from '../../assets/defaultProfile.svg';
import { TOKEN } from '../../../Join/Atoms';
import {
  accessClient,
  client,
  getprofilePresignedURL,
} from '../../../../axiosInstance';

interface IDefaultProps {
  setMode?: any;
  user?: any;
}
const Default = ({ setMode }: IDefaultProps) => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Image, setImage] = useState('');

  const fileInput = useRef<any>(null);
  useEffect(() => {
    getUser(token).then((res) => {
      setImage(res.image_url || defaultProfile);
      setName(res.profile_nickname);
      setEmail(res.user_email);
    });
  }, []);

  const changeHandler = async (e: any) => {
    if (e.target.files[0]) {
      const getS3UploadImg = await getprofilePresignedURL(e.target.files[0]);
      console.log('getprofilePresignedURL', getS3UploadImg);
      const resultId = await client
        .post(`photos`, {
          url: getS3UploadImg,
        })
        .then((res) => res.data.data.id);

      accessClient(token)
        .put(`profiles/image/${resultId}`)
        .then((res) => console.log('result', res))
        .catch((err) => console.log('err', err));
      setImage(getS3UploadImg);
    } else {
      setImage(defaultProfile);
    }
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

      <CustomizedTooltips content="닉네임 변경">
        <S.NickName
          onClick={() => {
            setMode('EDITNAME');
          }}
        >
          {name}
        </S.NickName>
      </CustomizedTooltips>

      <S.Email>{email}</S.Email>
    </S.Container>
  );
};

export default Default;
