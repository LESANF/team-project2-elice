import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
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

const NavigateButton = styledMui(ButtonMui)<INavigateButton>`
  width:fit-content;
  height:fit-content;
  padding: 1vh 1.2vw;
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
            left: '70vw',
            width: 'fit-content',
            height: 'fit-content',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '1',
            borderRadius: '12px',
            padding: '3vmin',
            boxShadow: '-2px 3px 6px rgb(0 0 0 / 30%)',
          }}
        >
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: '1',
              marginBottom: '3vmin',
              gap: '3vmin',
            }}
          >
            <img
              style={{ borderRadius: '0.8vmin', width: '20vmin' }}
              src={objectURL ? objectURL[index] : ''}
              alt=""
            />
            <pre
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2vh',
                whiteSpace: 'normal',
              }}
            >
              <p style={{ fontSize: 'calc(4px + 2vmin)' }}>게시글 제목</p>
              <p style={{ fontSize: 'calc(2.7px + 1.4vmin)' }}>
                게시글 내용...
              </p>
              <p style={{ fontSize: 'calc(2.7px + 1.4vmin)' }}>작성자</p>
            </pre>
          </div>
          <NavigateButton
            backgroundColor="#07b8b8"
            hoverBackgroundColor="#00a8a7"
          >
            게시글보러가기
          </NavigateButton>
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
