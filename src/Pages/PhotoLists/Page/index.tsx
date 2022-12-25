import { ImageList, ImageListItem } from '@mui/material';
import * as P from './styled';

const pictures = [
  {
    title: '카카오',
    latlng: { lat: 37.4905399, lng: 126.7282486 },
    image: 'img-1',
    hashtags: ['돈까스', '짜장면', '마라탕', '스시'],
  },
  {
    title: '생태연못',
    latlng: { lat: 37.4925499, lng: 126.7256586 },
    image: 'img-2',
    hashtags: ['스시'],
  },
  {
    title: '텃밭',
    latlng: { lat: 37.4925499, lng: 126.7246586 },
    image: 'img-3',
    hashtags: ['마라탕'],
  },
  {
    title: '근린공원',
    latlng: { lat: 37.4909399, lng: 126.7289486 },
    image: 'img-4',
    hashtags: ['짜장면', '마라탕'],
  },
  {
    title: '광장계단',
    latlng: { lat: 37.4900399, lng: 126.7232486 },
    image: 'img-5',
    hashtags: ['짜장면', '마라탕', '스시'],
  },
  {
    title: '광진구청',
    latlng: { lat: 37.4895399, lng: 126.7292486 },
    image: 'img-6',
    hashtags: ['짬뽕', '스시', '피자', '햄버거', '쌀국수', '카레'],
  },
  {
    title: '간선2로',
    latlng: { lat: 37.4885399, lng: 126.7272486 },
    image: 'img-7',
    hashtags: ['돈까스', '짜장면', '마라탕', '스시'],
  },
  {
    title: '석상타워',
    latlng: { lat: 37.4934399, lng: 126.7345486 },
    image: 'img-8',
    hashtags: ['스시', '떡볶이', '족발'],
  },
  {
    title: '붉은역',
    latlng: { lat: 37.4920399, lng: 126.7343486 },
    image: 'img-9',
    hashtags: ['마라탕', '치킨'],
  },
  {
    title: '독일마을',
    latlng: { lat: 37.4934099, lng: 126.7311486 },
    image: 'img-10',
    hashtags: ['짜장면', '마라탕', '족발'],
  },
  {
    title: '제주대학',
    latlng: { lat: 37.4894099, lng: 126.7311486 },
    image: 'img-11',
    hashtags: ['떡볶이', '스시', '비빔밥'],
  },
  {
    title: '제주숲',
    latlng: { lat: 37.4896099, lng: 126.7331486 },
    image: 'img-12',
    hashtags: [
      '짬뽕',
      '스시',
      '피자',
      '햄버거',
      '쌀국수',
      '카레',
      '족발',
      '짜장면',
      '비빔밥',
    ],
  },
  {
    title: '석양마을',
    latlng: { lat: 37.4899099, lng: 126.7321486 },
    image: 'img-13',
    hashtags: ['돈까스', '햄버거', '피자', '치킨'],
  },
  {
    title: '안개마을',
    latlng: { lat: 37.4884099, lng: 126.7301486 },
    image: 'img-14',
    hashtags: ['스시', '비빔밥', '라멘', '삼겹살'],
  },
  {
    title: '전포카페거리',
    latlng: { lat: 37.4924099, lng: 126.7311486 },
    image: 'img-15',
    hashtags: ['마라탕', '삼겹살', '짬뽕'],
  },
  {
    title: '은아숲',
    latlng: { lat: 37.4922099, lng: 126.7291486 },
    image: 'img-16',
    hashtags: ['짜장면', '마라탕'],
  },
  {
    title: '나귀마을',
    latlng: { lat: 37.4904099, lng: 126.7311486 },
    image: 'img-17',
    hashtags: ['짜장면', '마라탕', '스시'],
  },
  {
    title: '노을바다',
    latlng: { lat: 37.4920099, lng: 126.7221486 },
    image: 'img-18',
    hashtags: ['짬뽕', '스시', '피자', '햄버거', '쌀국수', '카레'],
  },
];

const PhotoLists = () => (
  <P.Container>
    <ImageList variant="masonry" cols={6} gap={16}>
      {pictures.map((picture) => (
        <ImageListItem key={picture.image}>
          <img
            src={`/images/${picture.image}.jpg?w=248&fit=crop&auto=format`}
            srcSet={`/images/${picture.image}.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={picture.title}
            loading="lazy"
            style={{ borderRadius: 8 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  </P.Container>
);

export default PhotoLists;
