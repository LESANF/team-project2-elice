import styled from 'styled-components';

export const Container = styled.div`
  min-width: 826px;
  padding: 50px 50px 0 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  padding: 20px 60px 0px 60px;
  width: 826px;
  margin-bottom: 45px;
`;

export const TitleBox = styled.div``;
export const TitleArea = styled.textarea.attrs({
  placeholder: '제목을 입력하세요',
})`
  height: 72px;
  min-height: 72px;
  font-size: 48px;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  display: block;
  color: #000;
  width: 100%;
`;
export const BoxBorder = styled.div`
  background: rgb(73, 80, 87);
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
  margin-bottom: 20px;
  border: none;
`;
export const Tag = styled.div<{ bgColor: string }>`
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 16px 0 16px;
  background: ${({ bgColor }) => bgColor};
  color: white;
  margin-right: 12px;
  margin-bottom: 12px;
  transition: 0.125s ease-in 0s;
  cursor: pointer;
  animation: 0.125s ease-in-out 0s;
`;

export const CameraWrapper = styled.div``;
export const CameraModelBox = styled.div`
  display: flex;
  justify-content: flex-start;
  /* align-items: flex-start; */
  width: 100%;
`;
export const CameraIconBox = styled.div`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CameraSelectBox = styled.select`
  width: 200px;
  height: 30px;
`;

export const ContentBox = styled.div``;
export const QuillEditor = styled.div`
  height: 706px;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #d0d0d0;
  z-index: 100;
`;

export const SubmitBtn = styled.button`
  width: 60px;
  height: 40px;
  margin-right: 30px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 16px;
  color: white;
  background-color: #07b8b8;
`;
