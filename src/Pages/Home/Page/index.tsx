import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as S from './styled';
import { useGetData } from '../hooks/useGetData';
import { disableScroll, removeDisableScroll } from '../Utils';
import { ReactComponent as Logo } from '../assets/logo.svg';
import MapDemo from '../assets/map.gif';
import Demo from '../assets/demo.gif';
import CubeContainer from '../Components/Cube';
import { DialogTest } from '../../Join/Components/LoginDialog/index';

const Intro = () => {
  const [flag, setFlag] = useState(false);
  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };
  useEffect(() => {
    disableScroll();
    return removeDisableScroll;
  }, []);
  const objectURL = useGetData('https://picsum.photos/238/349', 7);
  const navigate = useNavigate();
  const motionVariants = {
    hover: {
      top: '-100px',
      scale: 3,
      transition: { duration: 0.5 },
    },
  };
  return (
    <>
      <style id="scroll-properties">
        {`::-webkit-scrollbar {
          display: none;
			  }`}
      </style>
      <S.Container className="Intro" fontFamily="Segoe UI">
        <S.Section backgroundcolor="#ffffff">
          <S.Header>
            <Logo
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/menu/maps');
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <S.PrimaryButton
                fontSize="20px"
                onClick={() => {
                  setFlag(true);
                }}
              >
                로그인
              </S.PrimaryButton>
              <S.TextButton
                onClick={() => {
                  navigate('/join');
                }}
              >
                가입하기
              </S.TextButton>
            </div>
          </S.Header>
          <S.Body>
            <S.StyledH1 style={{ textAlign: 'center' }}>
              포토로그와 함께
              <br />
              <p style={{ color: '#0076D3' }}>
                마음에 드는 사진들을 찾아보세요
              </p>
            </S.StyledH1>
          </S.Body>
          <S.ImageList>
            {Array(7)
              .fill('')
              .map((_, idx) => {
                let offset;
                const key = idx;
                if (Math.abs(idx - 3) % 3 === 0) offset = 0;
                if (Math.abs(idx - 3) % 3 === 2) offset = 75;
                if (Math.abs(idx - 3) % 3 === 1) offset = 75 + 65;
                if (idx === 3) offset = 75 + 65 + 50;
                return (
                  <motion.div
                    key={key}
                    variants={motionVariants}
                    style={{
                      position: 'relative',
                      top: `${offset}px`,
                    }}
                    animate={{
                      transform: 'translateY(-5px)',
                      transition: {
                        from: 'translateY(0px)',
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      },
                    }}
                    whileHover="hover"
                  >
                    <img
                      style={{
                        width: '238px',
                        height: '349.55px',
                        borderRadius: '20px',
                      }}
                      key={key}
                      src={objectURL ? objectURL[idx] : ''}
                      alt=""
                    />
                  </motion.div>
                );
              })}
          </S.ImageList>
          <div
            style={{
              width: '100%',
              height: '9vh',
              zIndex: '100',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '3vh',
                zIndex: '100',
                background:
                  'linear-gradient(0deg, #FFE696 0%, rgba(255, 255, 255, 0) 34.18%)',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '6vh',
                backgroundColor: '#FFE696',
                zIndex: '100',
              }}
            />
          </div>
        </S.Section>
        <S.Section2 backgroundcolor="#FFE696">
          <S.Body2>
            <S.StyledH1>
              <p style={{ color: '#C52424' }}>지도로 주변 명소 검색</p>
            </S.StyledH1>
            <pre
              style={{
                fontSize: '0.6em',
                color: '#C52424',
                width: 'fit-content',
                textAlign: 'center',
                marginBottom: '40px',
                lineHeight: '140%',
              }}
            >
              주변에 멋진 장소를 찾고있나요? 사진 찍기 좋은 장소를 찾고
              <br />
              친구들과 공유해 보세요.
            </pre>
            <S.NavigateButton
              backgroundcolor="#C52424"
              hoverbackgroundcolor="#A51313"
              onClick={() => {
                navigate('/menu/maps');
              }}
            >
              탐색
            </S.NavigateButton>
          </S.Body2>
          <div
            style={{
              width: '713.59px',
              height: '486.56px',
              background: '#F5F5F5',
              overflow: 'hidden',
            }}
          >
            <img
              style={{
                position: 'relative',
                left: '60px',
                scale: '1.2',
              }}
              src={MapDemo}
              alt="지도데모영상"
            />
          </div>
        </S.Section2>
        <S.Section2 backgroundcolor="#AAE0E1">
          <div
            style={{
              width: '713.59px',
              height: '486.56px',
              background: '#F5F5F5',
              overflow: 'hidden',
            }}
          >
            <img
              style={{
                position: 'relative',
                left: '-446px',
                top: '-296px',
                scale: '0.5',
              }}
              src={Demo}
              alt="좋아요데모영상"
            />
          </div>
          <S.Body2>
            <S.StyledH1>
              <p style={{ color: '#0D61AE' }}>좋아하는 사진을 저장하세요</p>
            </S.StyledH1>
            <pre
              style={{
                fontSize: '0.6em',
                color: '#0D61AE',
                width: 'fit-content',
                textAlign: 'center',
                lineHeight: '140%',
              }}
            >
              나중에 다시 볼 수 있도록 좋아하는 사진을
              <br />
              수집하세요. 관심 있는 해쉬태그를 검색하고
              <br />
              좋아요를 남겨 언제든 다시 볼 수 있어요.
            </pre>
            <S.NavigateButton
              backgroundcolor="#0D61AE"
              hoverbackgroundcolor="#044F94"
              onClick={() => {
                navigate('/menu/photolists');
              }}
            >
              탐색
            </S.NavigateButton>
          </S.Body2>
        </S.Section2>
        <S.Section2 backgroundcolor="#FFFFFF">
          <CubeContainer />
        </S.Section2>
      </S.Container>
      <DialogTest
        openFlag={flag}
        title="test"
        content="test"
        agreeFn={() => {}}
        disAgreeFn={disAgreeFn}
        sizeW="600px"
        sizeH="800px"
      />
    </>
  );
};

export default Intro;
