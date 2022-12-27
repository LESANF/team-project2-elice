import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 93vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const PasswordChange = styled.p`
  padding: 10px 20px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  :hover {
    font-weight: 500;
    color: #07b8b8;
  }
`;

export const NickName = styled.input`
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  border: 0;
  border-radius: 4px;
  padding: 8px 10px;
  line-height: 27px;
  text-align: center;
  color: #5f5f5f;
  margin-top: -20px;
  ::placeholder {
    color: #ccc;
    font-family: 'Noto Sans', 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
  }
  :focus::placeholder {
    color: transparent;
  }
  :focus {
    border: 0;
  }
  :focus-visible {
    outline: none;
  }
  :hover {
    background: #f9f9f9;
  }
`;

export const Email = styled.p`
  padding: 10px 20px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #5f5f5f;
  cursor: default;
  margin-bottom: 24px;
`;
