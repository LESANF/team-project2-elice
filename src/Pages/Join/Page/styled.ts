import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
  top: 77px;
  width: 1040px;
  height: 80vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
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
  span.login {
    font-weight: ${(props) => (props.mode === 'login' ? 'bold' : 'normal')};
  }
  span.join {
    font-weight: ${(props) => (props.mode === 'join' ? 'bold' : 'normal')};
  }
  span.findpw {
    width: 120px;
    font-weight: ${(props) => (props.mode === 'findpw' ? 'bold' : 'normal')};
  }
`;

export const TapItems = styled.ul`
  display: flex;
  gap: 10px;
`;

export const TapItem = styled.li`
  position: relative;
  padding: 13px 20px;
  cursor: pointer;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #5f5f5f;

  :hover {
    background: #f9f9f9;
    font-weight: 600;
  }
`;

export const TapUnderline = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  background-color: black;
`;
