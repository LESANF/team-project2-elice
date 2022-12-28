import React, { useCallback, useState, useEffect } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import * as P from './styled';
import getRandomArbitrary from '../utils/getRandomArbitrary';
import getRandomHashtags from '../utils/getRandomHashtags';
import { TOKEN } from '../../Join/Atoms';

const URL = 'http://34.64.34.184:5001';

const PhotoLists = () => {
  const [ref, inView] = useInView();
  const [items, setItems] = useState<Array<object>>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useRecoilState(TOKEN);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [endPostId, setEndPostId] = useState<number | null>(null);

  const getItems = useCallback(async () => {
    setLoading(true);
    let response = null;
    let pictureData: any = null;
    if (!isLast) {
      try {
        const quantity = 30;
        if (endPostId === null) {
          // 첫 로딩 시 데이터 가져오기
          response = await axios.get(`${URL}/posts?quantity=${quantity}`);
        } else if (endPostId !== null) {
          // 스크롤 시 데이터 추가로 가져오기
          response = await axios.get(
            `${URL}/posts?quantity=${quantity}&endPostId=${endPostId}`,
          );
        } else {
          // console.log('페이지 끝');
        }
        const dataLength = response?.data.data.length;
        if (dataLength < quantity) {
          setIsLast(true);
        } else {
          setEndPostId(response?.data.data[dataLength - 1].id);
        }
        if (response?.statusText === 'OK') {
          pictureData = response?.data.data;
          setItems((prevState) => [...prevState, pictureData]);
        }
      } catch (err) {
        console.error('api요청에러: ', err);
      }
    }
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
  // 이 사이 위치를 랜덤으로. (테스트용 위치 by 김상현)

  const handleTempPostButton = async () => {
    const data = {
      title: '자동화제목',
      content: '자동화컨텐츠',
      imageUrlId: Math.floor(getRandomArbitrary(1, 7)),
      lensId: 254,
      cameraId: 292,
      latitude: getRandomArbitrary(37.46970512, 37.51551104),
      longitude: getRandomArbitrary(126.70134047, 126.75862053),
      locationInfo: '자동화위치',
      takenAt: new Date().toISOString(),
      hashtags: getRandomHashtags(),
    };
    try {
      if (token === null) {
        throw new Error('토큰 없음');
      }
      const response = await axios.post(`${URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('api요청에러: ', err);
    }
  };

  return (
    <P.Container>
      {/* <button onClick={handleTempPostButton}>post 밀어넣기 임시 버튼</button> */}
      <ImageList variant="masonry" cols={6} gap={16}>
        {items.map((item: any): any => (
          <React.Fragment key={uuidv4()}>
            {item.map((picture: any): any => (
              <ImageListItem key={picture.id}>
                <img
                  src={`${picture.images[0].imageUrl.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${picture.images[0].imageUrl.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
