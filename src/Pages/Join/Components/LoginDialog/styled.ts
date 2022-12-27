import TextField from '@mui/material/TextField';
import { styled as styledMui } from '@mui/material/styles';
import styled from 'styled-components';

interface IInput {
  state?: string;
}

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'Noto Sans KR', 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  color: #2a2a2a;
  text-align: center;
  margin-bottom: 30px;
`;
export const Form = styled.form`
  /* border: 1px solid pink; */
  height: 80px;
  display: flex;
  margin-top: 20px;
  div.title {
    width: 100px;
  }
  div.body {
    width: 100%;
    margin-left: auto;
  }
  input {
    height: 80%;
    width: 90%;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #cccccc;
    font-size: 20px;
    padding: 0px 20px;
  }
  + form {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  margin-top: 70px;
  width: 100%;
  height: 80px;
  border-radius: 12px;
  border: 0px;
  background: #07b8b8;
  font-size: 35px;
  color: white;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  :hover {
    background-color: #00a8a7;
  }
  + div {
    margin-top: 20px;
    text-align: center;
  }
`;

export const Input = styledMui(TextField)<IInput>`
font-family: 'Noto Sans', 'Noto Sans KR';
font-style: normal;
font-weight: 600;
font-size: 25px;
border-radius: 8px;
padding: 2px 2px;
line-height: 27px;
text-align: center;
color: #5f5f5f;
& .MuiInputBase-input{
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #5f5f5f;
}
& label {
  color:${(props) => (props.state ? '#FF9E44' : '#7f7676')};
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 34px;
  text-align: center;
}
&:hover label{
  color:${(props) => (props.state ? '#FF9E44' : '#07b8b8')};
}
& label.Mui-focused {
  color: ${(props) => (props.state ? '#FF9E44' : '#07b8b8')};
}
& .MuiOutlinedInput-root {
  border-radius:10px;
  & fieldset{
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '2px solid #ccc'};
  }
  &:hover fieldset {
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '3px solid #07b8b8'};
  }
  &.Mui-focused fieldset{
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '3px solid #07b8b8'};
  }
}
`;
