import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { styled as styledMui } from '@mui/material/styles';
import { Button as ButtonMui } from '@mui/material';
import { ReactComponent as Logo } from './logo.svg';
import MapDemo from './map.gif';
import Demo from './demo.gif';
import CubeContainer from './Cube';

interface IButton {
  fontSize: string;
}
interface IContainer {
  fontFamily: string;
}
interface ISection {
  backgroundColor: string;
}
interface INavigateButton {
  backgroundColor: string;
  hoverBackgroundColor: string;
}
const Button = styled.button<IButton>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  background: #07b8b8;
  border-radius: 6px;
  border: 0px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.fontSize};
  line-height: 140%;
  color: #ffffff;
  cursor: pointer;
  :hover {
    background-color: #00a8a7;
  }
`;
const TextButton = styledMui(ButtonMui)`
  padding: 8px 10px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size:20px;
  font-family: 'Segoe UI';
  line-height: 27px;
  color: #2A2A2A;
  :hover{
    color:#07b8b8;
  }
`;
const NavigateButton = styledMui(ButtonMui)<INavigateButton>`
  width:fit-content;
  height:fit-content;
  padding: 12px 47px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size:24px;
  font-family: 'Segoe UI';
  line-height: 32px;
  color: #FFFFFF;
  background-color: ${(props) => props.backgroundColor};
  :hover{
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;
const Container = styled.div<IContainer>`
  font-size: calc(10px + 3vmin);
  background-color: red;
  font-family: ${(props) => props.fontFamily};
`;
const Section = styled.div<ISection>`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Section2 = styled.div<ISection>`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 1vw;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 66px;
  width: 100%;
  padding: 66px 4.98vw;
`;
const ImageList = styled.div`
  position: relative;
  top: 11vh;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 30vh;
`;
const Body = styled.div`
  position: relative;
  top: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
  width: 100%;
  align-items: center;
`;
const Body2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
  align-items: center;
  gap: 50px;
`;
const StyledH1 = styled.h1`
  position: relative;
  font-size: 1.2em;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
  color: #2a2a2a;
`;
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function handleTouchEvent(e: Event) {
  e.preventDefault();
  console.log(e);
}
let isAnimating = false;
function handleWheelEvent(e: any) {
  e.preventDefault();
  if (e.deltaY > 0 && !isAnimating) {
    isAnimating = true;
    if (window.visualViewport)
      window.scrollBy({
        top: window.visualViewport.height,
        behavior: 'smooth',
      });
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
  if (e.deltaY < 0 && !isAnimating) {
    isAnimating = true;
    if (window.visualViewport)
      window.scrollBy({
        top: -window.visualViewport.height,
        behavior: 'smooth',
      });
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
}

function preventDefaultForScrollKeys(e: any): void | boolean {
  if (keys[e.keyCode as 37]) {
    e.preventDefault();
    return false;
  }
  return undefined;
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null as any,
    Object.defineProperty({}, 'passive', {
      get: () => {
        supportsPassive = true;
      },
    }),
  );
} catch (e) {
  console.log(e);
}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', handleWheelEvent, false); // older FF
  window.addEventListener(wheelEvent, handleWheelEvent, wheelOpt); // modern desktop
  // window.addEventListener('touchmove', handleTouchEvent, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
const debounceResizeEvent = (cb: any, delay: number) => {
  let timeout: any;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(args);
    }, delay);
  };
};
function wrapPromise(promise: any) {
  let status = 'pending';
  let result: any;
  const suspender = promise.then(
    (r: any) => {
      status = 'success';
      result = r;
    },
    (e: any) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      return undefined;
    },
  };
}
const fetcher = async (url: string) => {
  const promiseList: any = [];
  for (let i = 0; i < 7; i += 1) {
    promiseList.push(
      fetch(url)
        .then((res) => res.blob())
        .then(URL.createObjectURL),
    );
  }
  const res = await Promise.all(promiseList);
  // const delay = new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  // await delay;
  return res;
};
const useGetData = (url: string) => {
  const [resource, setResource] = useState(null as any);
  useEffect(() => {
    const res = wrapPromise(fetcher(url));
    setResource(res);
  }, [url]);
  return resource?.read();
};
const Intro = () => {
  disableScroll();
  const objectURL = useGetData('https://picsum.photos/238/349');
  const navigate = useNavigate();
  const motionVariants = {
    hover: {
      top: '-100px',
      scale: 3,
      transition: { duration: 0.5 },
    },
  };
  window.onresize = debounceResizeEvent(
    (e: React.UIEvent<Window, 'resize'>) => {
      if (window.visualViewport) {
        const vh = window.visualViewport.height;
        if (window.scrollY % vh === 0) return;
        if (window.scrollY < vh) window.scrollTo(0, vh);
        else if (window.scrollY < vh * 2) window.scrollTo(0, vh * 2);
        else if (window.scrollY < vh * 3) window.scrollTo(0, vh * 3);
        else if (window.scrollY < vh * 4) window.scrollTo(0, vh * 4);
        else if (window.scrollY < vh * 5) window.scrollTo(0, vh * 5);
      }
    },
    500,
  );
  return (
    <>
      <style id="scroll-properties">
        {`::-webkit-scrollbar {
          display: none;
			  }`}
      </style>
      <Container className="Intro" fontFamily="Segoe UI">
        <Section backgroundColor="#ffffff">
          <Header>
            <Logo
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/map');
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button fontSize="20px" onClick={alert}>
                로그인
              </Button>
              <TextButton
                onClick={() => {
                  navigate('/map');
                }}
              >
                가입하기
              </TextButton>
            </div>
          </Header>
          <Body>
            <StyledH1 style={{ textAlign: 'center' }}>
              포토로그와 함께
              <br />
              <p style={{ color: '#0076D3' }}>
                마음에 드는 사진들을 찾아보세요
              </p>
            </StyledH1>
          </Body>
          <ImageList>
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
          </ImageList>
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
        </Section>
        <Section2 backgroundColor="#FFE696">
          <Body2>
            <StyledH1>
              <p style={{ color: '#C52424' }}>지도로 주변 명소 검색</p>
            </StyledH1>
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
            <NavigateButton
              backgroundColor="#C52424"
              hoverBackgroundColor="#A51313"
            >
              탐색
            </NavigateButton>
          </Body2>
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
        </Section2>
        <Section2 backgroundColor="#AAE0E1">
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
          <Body2>
            <StyledH1>
              <p style={{ color: '#0D61AE' }}>좋아하는 사진을 저장하세요</p>
            </StyledH1>
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
            <NavigateButton
              backgroundColor="#0D61AE"
              hoverBackgroundColor="#044F94"
            >
              탐색
            </NavigateButton>
          </Body2>
        </Section2>
        <Section2 backgroundColor="#FFFFFF">
          <CubeContainer />
        </Section2>
      </Container>
    </>
  );
};

export default Intro;
