import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import { styled as styledMui } from '@mui/material/styles';
import { Button as ButtonMui } from '@mui/material';

interface CubeProps {
  objectURL?: string[];
  handler?: any;
  setIndex?: any;
}

interface INavigateButton {
  backgroundColor: string;
  hoverBackgroundColor: string;
}

interface IStyledP {
  lineClamp: string;
}

const StyledP = styled.p<IStyledP>`
  font-size: calc(2.3px + 1.2vmin);
  width: 8vw;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NavigateButton = styledMui(ButtonMui)<INavigateButton>`
  width:fit-content;
  height:fit-content;
  padding: 1vh 1vw;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size:calc(2.7px + 1.4vmin);
  font-family: 'Segoe UI';
  line-height: 140%;
  color: #FFFFFF;
  background-color: ${(props) => props.backgroundColor};
  :hover{
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;

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
  for (let i = 0; i < 6; i += 1) {
    promiseList.push(
      fetch(url)
        .then((res) => res.blob())
        .then(URL.createObjectURL),
    );
  }
  const res = await Promise.all(promiseList);
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

const Cube = ({ objectURL, handler, setIndex }: CubeProps) => {
  const cube = useRef<THREE.Mesh>();
  const [isRotating, setIsRotationg] = useState(true);
  useFrame((state) => {
    if (isRotating) {
      cube.current!.rotation.x += 0.01;
      cube.current!.rotation.y += 0.01;
    }
  });
  let timeout: NodeJS.Timeout;
  const loader = new THREE.TextureLoader();
  const texture0 = loader.load(objectURL![0]);
  const texture1 = loader.load(objectURL![1]);
  const texture2 = loader.load(objectURL![2]);
  const texture3 = loader.load(objectURL![3]);
  const texture4 = loader.load(objectURL![4]);
  const texture5 = loader.load(objectURL![5]);
  return (
    <mesh ref={cube as any}>
      <Box
        onPointerOver={(event) => {
          setIsRotationg((c) => !c);
        }}
        onClick={(event) => {
          const index = event.face?.materialIndex;
          handler(true);
          setIndex(index);
        }}
        onPointerLeave={() => {
          setIsRotationg((c) => !c);
        }}
        args={[1, 1, 1]}
      >
        <meshBasicMaterial attach="material-0" map={texture0} />
        <meshBasicMaterial attach="material-1" map={texture1} />
        <meshBasicMaterial attach="material-2" map={texture2} />
        <meshBasicMaterial attach="material-3" map={texture3} />
        <meshBasicMaterial attach="material-4" map={texture4} />
        <meshBasicMaterial attach="material-5" map={texture5} />
      </Box>
    </mesh>
  );
};

const Scene = ({ objectURL, handler, setIndex }: CubeProps) => (
  <>
    <pointLight intensity={0.93} position={[1, 1, 5]} />
    <Cube objectURL={objectURL} handler={handler} setIndex={setIndex} />
  </>
);

const CubeContainer: React.FC = () => {
  const objectURL = useGetData('https://picsum.photos/200/200');
  const [isPopupOn, setIsPopupOn] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <Canvas
        camera={{
          near: 0.1,
          far: 100,
          zoom: 2,
        }}
      >
        <OrbitControls enableZoom={false} />
        <Scene
          objectURL={objectURL}
          handler={setIsPopupOn}
          setIndex={setIndex}
        />
      </Canvas>
      {isPopupOn && (
        <div
          className="popup"
          onMouseLeave={() => {
            setIsPopupOn(false);
          }}
          style={{
            position: 'absolute',
            left: '66vw',
            width: 'fit-content',
            height: 'fit-content',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            padding: '3vmin',
            gap: '3vmin',
            boxShadow: 'rgb(0 0 0 / 10%) -3px 7px 12px',
          }}
        >
          <img
            style={{ borderRadius: '0.8vmin', width: '21vmin' }}
            src={objectURL ? objectURL[index] : ''}
            alt=""
          />
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3vmin',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2vh',
              }}
            >
              <p
                style={{
                  fontSize: 'calc(3.2px + 1.6vmin)',
                  width: '9vw',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                게시글 제목이 들어갈 자리
              </p>
              <StyledP lineClamp="3">
                게시글 내용이 들어갈 자리 게시글 내용이 들어갈 자리 게시글
                내용이 들어갈 자리 게시글 내용이 들어갈 자리
              </StyledP>
              <p
                style={{
                  fontSize: 'calc(2.1px + 1.1vmin)',
                  width: '9vw',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                작성자
              </p>
            </div>
            <NavigateButton
              backgroundColor="#07b8b8"
              hoverBackgroundColor="#00a8a7"
            >
              게시글 보러가기
            </NavigateButton>
          </div>
        </div>
      )}
    </>
  );
};

Cube.defaultProps = {
  objectURL: '',
  handler: () => {},
  setIndex: () => {},
};
Scene.defaultProps = {
  objectURL: '',
  handler: () => {},
  setIndex: () => {},
};
export default CubeContainer;
