const HASH_TAGS = [
  '돈까스',
  '짜장면',
  '마라탕',
  '스시',
  '짬뽕',
  '피자',
  '햄버거',
  '쌀국수',
  '카레',
  '떡볶이',
  '라멘',
  '족발',
  '보쌈',
  '치킨',
  '비빔밥',
  '삼겹살',
];

const MAX_NUM_HASH_TAGS = 5;

const getRandomHashtags = (): string[] => {
  const num = Math.floor(Math.random() * MAX_NUM_HASH_TAGS);
  const result = [];
  let pick = '';
  for (let i = 0; i < num; i += 1) {
    pick = HASH_TAGS[Math.floor(Math.random() * HASH_TAGS.length)];
    result.push(pick);
  }
  return result;
};

export default getRandomHashtags;
