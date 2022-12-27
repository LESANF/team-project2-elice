import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { ImageList, ImageListItem } from '@mui/material';
import * as P from '../../../PhotoLists/Page/styled';
import * as S from './styled';
import { TOKEN } from '../../../Join/Atoms';
import { URL } from '../../../../axiosInstance';

const MypostTap = () => {
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
          console.log('데이터', response.data.data);
        } else if (endPostId !== null) {
          // 스크롤 시 데이터 추가로 가져오기
          response = await axios.get(
            `${URL}/posts?quantity=${quantity}&endPostId=${endPostId}`,
          );
        } else {
          console.log('페이지 끝');
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
    console.log('items: ', typeof items, items);
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
  return (
    <S.Container>
      <P.Container>
        <ImageList variant="masonry" cols={5} gap={16}>
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
      </P.Container>
    </S.Container>
  );
};

export default MypostTap;
