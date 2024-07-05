import styled from 'styled-components';

export const PhotoPostWrapper = styled.div``;

export const CommentWrapper = styled.div`
  position: relative;
  margin-top: 100px;
  padding-top: 150px;
  width: 704px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: skyblue;
`;
export const CommentZone = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  top: 0;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const UserProfileBox = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserProfileImg = styled.img`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
`;
export const UserNickName = styled.div`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
export const UserComment = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
`;

export const CommentTextArea = styled.textarea`
  width: 480px;
  height: 50px;
`;
export const CommentCreateBtn = styled.button`
  margin-left: 20px;
`;

export const CommentLists = styled.ul<{ token: string }>`
  width: 704px;
  display: flex;
  margin-top: ${(props) => {
    console.log('stlyed token: ', props.token);
    return props.token === null ? `-150px` : `0px`;
  }};
  flex-direction: column;
  background-color: peru;
`;
export const CommentItem = styled.li`
  width: 100%;
  height: 150px;
  background-color: red;
  display: flex;
  border: 2px solid black;
  justify-content: space-between;
  align-items: center;
`;
export const CommentDeleteBtn = styled.button``;
export const CommentUpdateBtn = styled.button``;
