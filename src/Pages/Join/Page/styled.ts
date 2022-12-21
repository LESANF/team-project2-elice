import styled from 'styled-components';

export const Container = styled.div`
  width: 1040px;
  height: 700px;
  margin: 100px auto;

  background: #f9f9f9;
  border: 1px solid #cccccc;
  border-radius: 25px;

  padding: 50px 110px;
  display: flex;
  flex-direction: column;
`;

export const Tap = styled.div<{ mode: string }>`
  margin: 20px 0px;
  span {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    width: 80px;
  }
  span.LOGIN {
    font-weight: ${(props) => (props.mode === 'LOGIN' ? 'bold' : 'normal')};
  }
  span.JOIN {
    font-weight: ${(props) => (props.mode === 'JOIN' ? 'bold' : 'normal')};
  }
  span.FINDPW {
    width: 120px;
    font-weight: ${(props) => (props.mode === 'FINDPW' ? 'bold' : 'normal')};
  }
`;
