// 두 수 사이의 랜덤값 반환

const getRandomArbitrary = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export default getRandomArbitrary;
