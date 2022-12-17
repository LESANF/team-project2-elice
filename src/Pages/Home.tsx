import styled from 'styled-components';
import DialogTest from '../Components/Commons/Dialog';

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestBtn = styled.button``;

const openFunction = () => {
  console.log('Open');
};

const closeFunction = () => {
  window.open('https://www.naver.com');
};

const Home = () => (
  <Wrapper>
    <TestBtn>Click</TestBtn>
    <DialogTest
      title="DialogTitle"
      content="본문 내용 입니다."
      openFunction={openFunction}
      closeFunction={closeFunction}
    />
  </Wrapper>
);

export default Home;
