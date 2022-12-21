import styled from 'styled-components';

export const Form = styled.form`
  /* border: 1px solid pink; */
  height: 120px;

  display: flex;
  margin-top: 20px;
  div.title {
    width: 150px;
  }
  input {
    height: 0.8em;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #cccccc;
    font-size: 30px;
    padding: 30px;
  }
  + form {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  margin-top: auto;
  margin-left: 150px;

  width: 427px;
  height: 88px;
  border-radius: 6px;
  border: 0px;
  background: #07b8b8;
  font-size: 35px;
  color: white;
  font-weight: 400;
  :hover {
    background-color: #00a8a7;
  }
`;
export const InfoTop = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 26px;
  font-weight: 400;
`;
export const InfoBottom = styled.div`
  /*요거만 다름*/
  margin-left: 150px;
  li + li {
    margin-top: 10px;
  }
`;
