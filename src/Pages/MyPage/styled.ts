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
