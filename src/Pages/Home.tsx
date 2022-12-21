import { useState } from 'react';
import styled from 'styled-components';
import DialogTest from '../Components/Commons/Dialog';

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestBtn = styled.button`
  background-color: skyblue;
  width: 100px;
  height: 50px;
`;

const Home = () => {
  const [flag, setFlag] = useState(false);

  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };

  return (
    <Wrapper>
      <TestBtn onClick={() => setFlag(true)}>HomeBtn</TestBtn>
      <DialogTest
        openFlag={flag}
        title="Dialog Home"
        content="Home Screen"
        agreeFn={agreeFn}
        disAgreeFn={disAgreeFn}
      />
    </Wrapper>
  );
};

export default Home;
