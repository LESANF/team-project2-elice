import styled from 'styled-components';
import { styled as styledMui } from '@mui/material/styles';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';

interface IPwInput {
  state: string;
}

export const Container = styled.div`
  display: flex;
  height: 23vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const NickName = styled.p`
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #5f5f5f;
  cursor: default;
  margin-top: 30px;
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

export const PasswordInput = styledMui(OutlinedInput)`
  color:red;
  background:blue;
  border:0;
  input{
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
  }
`;

export const PwInput = styledMui(Input)<IPwInput>`
  input{
    font-family: 'Noto Sans', 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    border: ${(props) => (props.state ? '3px solid #FF9E44' : '0')};
    border-radius: 4px;
    padding: 2px 3px;
    line-height: 27px;
    text-align: center;
    color: #5f5f5f;
    margin-top: -20px;
    ::placeholder {
      color:#7f7676;
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
      border: ${(props) => (props.state ? '3px solid #FF9E44' : '0')};
    }
    :focus-visible {
      outline: none;
    }
    :hover {
      background: #f9f9f9;
    }
  }
`;
