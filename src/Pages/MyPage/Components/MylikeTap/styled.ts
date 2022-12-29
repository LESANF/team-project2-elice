import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px 20px;
  margin-right: 200px;
`;

export const LikeButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.66);
  z-index: 12;
  bottom: 10px;
  right: 10px;
  & img {
    position: absolute;
    top: 30%;
    left: 25%;
    filter: invert(30%) sepia(5%) saturate(16%) hue-rotate(323deg)
      brightness(96%) contrast(91%);
    transition: all 0.3s;
  }
  img:hover {
    transform: scale(120%, 120%);
  }
  & img.like {
    filter: invert(17%) sepia(92%) saturate(2871%) hue-rotate(325deg)
      brightness(88%) contrast(96%);
  }
`;
