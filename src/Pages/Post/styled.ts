import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  padding: 20px 60px 0px 60px;
  width: 100%;
`;

export const TitleBox = styled.div``;
export const TitleArea = styled.textarea`
  height: 66px;
  font-size: 48px;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  display: block;
  color: #000;
  width: 100%;
  background-color: peru;
`;
export const BoxBorder = styled.div`
  background: red;
  width: 80px;
  align-self: flex-start;
  height: 6px;
  margin-top: 24px;
  margin-bottom: 18px;
  border-radius: 1px;
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
`;
export const TagInput = styled.input.attrs({
  placeholder: '태그를 입력하세요',
})`
  background: transparent;
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 10px;
  border: none;
  background-color: blue;
`;
export const Tag = styled.div``;

export const ContentBox = styled.div``;
export const QuillEditor = styled.div``;

export const PostFooter = styled.div``;
