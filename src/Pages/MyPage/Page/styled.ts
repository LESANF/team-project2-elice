import styled from 'styled-components';

export const MyPage = styled.div`
  width: 1040px;
  height: 240;
  margin: 100px auto;

  background: #ddf2f4;
  /* border: 1px solid #cccccc; */
  border-radius: 25px;

  padding: 40px;
  display: flex;
  /* flex-direction: column; */

  .profileImg {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .profileBody {
    /* border: 1px solid #cccccc; */

    margin-left: 20px;
    .nickname {
      font-size: 25px;
    }
  }
  .editbtn {
    margin-left: auto;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const Tap = styled.div<{ mode: string }>`
  margin: 20px 0px;
  span {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    width: 80px;
  }
  span.MYPOST {
    font-weight: ${(props) => (props.mode === 'MYPOST' ? 'bold' : 'normal')};
  }
  span.MYLIKE {
    width: 120px;
    font-weight: ${(props) => (props.mode === 'MYLIKE' ? 'bold' : 'normal')};
  }
`;

export const ProfileContainer = styled.div`
  width: 25vw;
  min-width: 300px;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0 50px;
  border: 3px solid black;
`;

export const Profile = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ChangeMode = styled.p`
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
    color: #ff9e44;
  }
`;

export const PhotoContainer = styled.div`
  position: absolute;
  left: 25vw;
  top: 77px;
  min-width: fit-content;
  /* background: #9396f1; */
  @media screen and (max-width: 1200px) {
    left: 300px;
  }
`;
