import React, { useCallback, useState, useEffect } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as P from './styled';
import getRandomArbitrary from '../utils/getRandomArbitrary';
import getRandomHashtags from '../utils/getRandomHashtags';

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

const PhotoLists = () => {
  const [ref, inView] = useInView();
  const [items, setItems] = useState<Array<object>>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getItems = useCallback(async () => {
    setLoading(true);
    // - API 요청 로직 -
    // 1. 한번에 30개 데이터 받아오기 (최신게시글)
    // 2. 받아온 데이터가 30개 미만이면 더이상 요청하지 않기
    // 3. 받아온 데이터가 30개 이상이면 받아온 데이터의 마지막 postID를 넣어 다시 요청
    await axios.get(`http://34.64.34.184:5001/posts`).then((res) => {
      console.log(res);
    });
    // await axios ... 로 데이터 응답 res 받아서 아래 "pictures"에 넣어준다.
    setItems((prevState) => [...prevState, pictures]);
    setLoading(false);
  }, [page]);

  // 새로고침 시 화면 맨 위로. (화면 아래에서 새로고침 했을 때 한꺼번에 API요청 여러번 하는 것 방지)
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // 임시 버튼을 위한 핸들러
  // 데이터를 200개 쯤 넣을 것임
  // 위치 데이터는 특정 범위를 줘서 랜덤으로 넣을 것임.
  // sw: {
  //   lat: 37.48970512,
  //   lng: 126.72134047,
  // },
  // ne: {
  //   lat: 37.49551104,
  //   lng: 126.73862053,
  // },
  // 이 사이 위치를 랜덤으로.
  const handleTempPostButton = async () => {
    const data = {
      title: '자동화제목',
      content: '자동화컨텐츠',
      imageUrlId: 1,
      lensId: 254,
      cameraId: 292,
      latitude: getRandomArbitrary(37.48970512, 37.49551104),
      longitude: getRandomArbitrary(126.72134047, 126.73862053),
      locationInfo: '자동화위치',
      takenAt: new Date().toISOString(),
      hashtags: getRandomHashtags(),
    };
    // data를 json화 해서 보내기
    try {
      const response = await axios.post(`http://34.64.34.184:5001/posts`, data);
      if (response.statusText === 'OK') {
        console.log('post 성공');
      }
    } catch (err) {
      console.error('api요청에러: ', err);
    }
  };

  return (
    <P.Container>
      <button onClick={handleTempPostButton}>post 밀어넣기 임시 버튼</button>
      <ImageList variant="masonry" cols={6} gap={16}>
        {items.map((item: any): any => (
          <React.Fragment key={uuidv4()}>
            {item.map((picture: any): any => (
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
          </React.Fragment>
        ))}
      </ImageList>
      <div ref={ref} style={{ height: '100px' }} />
    </P.Container>
  );
};

export default PhotoLists;
