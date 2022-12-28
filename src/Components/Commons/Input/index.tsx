import styled from 'styled-components';

const InputContainer = styled.div`
  & input {
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
const InputWrapper = ({ children }: any) => (
  <InputContainer>{children}</InputContainer>
);
export default InputWrapper;
