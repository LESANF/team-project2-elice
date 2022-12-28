import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from './styled';

// 임시 사용자 사진 데이터
// 37.4905399 126.7280586
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

// 인터페이스
interface ILatLng {
  lat: number;
  lng: number;
}

interface ICustomOverlayContainerProps {
  latlng: ILatLng;
  image: string;
  title: string;
}

interface IImageProps {
  src: string;
  alt: string;
  title: string;
}

interface IHashTagProps {
  hashtag: string;
  setHashtag: Dispatch<SetStateAction<string>>;
}

interface IBoundaryLocation {
  sw: ILatLng;
  ne: ILatLng;
}

// [2022-12-19] 추후 실제 게시물페이지와 연동할 때 여기 이벤트를 수정해주면 된다.
const Image = ({ src, alt, title }: IImageProps) => {
  const handleImage = () => {
    console.log('🚀 ~ file: index.tsx:51 ~ handleImage ~ title', title);
  };
  return (
    <img
      src={src}
      alt={alt}
      onClick={() => {
        handleImage();
      }}
      role="presentation"
    />
  );
};

const HashTag = ({ hashtag, setHashtag }: IHashTagProps) => (
  <span onClick={() => setHashtag('')} role="presentation">
    {hashtag}
  </span>
);

const CustomOverlayContainer = ({
  latlng,
  image,
  title,
}: ICustomOverlayContainerProps) => (
  <CustomOverlayMap
    position={{
      lat: latlng.lat,
      lng: latlng.lng,
    }}
  >
    {/* 커스텀 오버레이에 표시할 내용입니다 */}
    <S.CustomOverlayStyle>
      <Image src={`/images/${image}.jpg`} alt={`${title}-img`} title={title} />
    </S.CustomOverlayStyle>
  </CustomOverlayMap>
);

const Maps = () => {
  const [hashtag, setHashtag] = useState<string>('');
  const [myLocation, setMyLocation] = useState<ILatLng>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [boundaryLocation, setBoundaryLocation] = useState<IBoundaryLocation>({
    sw: {
      lat: 37.48970512,
      lng: 126.72134047,
    },
    ne: {
      lat: 37.49551104,
      lng: 126.73862053,
    },
  });
  const enterKey = (e: any) => {
    if (e.keyCode === 13 || e.code === 'Enter' || e.key === 'Enter') {
      setHashtag(e.target.value);
    }
  };
  useEffect(() => {
    const searchInput = document.querySelector('.search_input');
    searchInput?.addEventListener('keyup', enterKey);
    return () => {
      searchInput?.removeEventListener('keyup', enterKey);
    };
  }, []);
  useEffect(() => {
    // 페이지 로딩 시 내 위치정보를 불러오는 코드
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyLocation((prev) => ({
              ...prev,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }));
          },
          (err) => {
            throw new Error(err.message);
          },
          {
            enableHighAccuracy: true,
          },
        );
      } else {
        throw new Error('위치정보 사용 불가능');
      }
    } catch (err) {
      console.error(`에러: ${err}`);
    }
  }, []);

  return (
    <>
      {hashtag && (
        <S.HashTagStyle>
          <HashTag hashtag={hashtag} setHashtag={setHashtag} />
        </S.HashTagStyle>
      )}
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: myLocation.lat,
          lng: myLocation.lng,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '640px',
          borderRadius: '10px',
        }}
        level={3} // 지도의 확대 레벨
        onTileLoaded={(map) =>
          setBoundaryLocation({
            sw: {
              lat: map.getBounds().getSouthWest().getLat(),
              lng: map.getBounds().getSouthWest().getLng(),
            },
            ne: {
              lat: map.getBounds().getNorthEast().getLat(),
              lng: map.getBounds().getNorthEast().getLng(),
            },
          })
        }
      >
        {hashtag === ''
          ? pictures.map((picture) => {
              const isBoundary =
                picture.latlng.lat > boundaryLocation?.sw.lat &&
                picture.latlng.lng > boundaryLocation?.sw.lng &&
                picture.latlng.lat < boundaryLocation?.ne.lat &&
                picture.latlng.lat < boundaryLocation?.ne.lng;
              if (isBoundary) {
                return (
                  <CustomOverlayContainer
                    key={`${picture.title}-${picture.latlng}`}
                    latlng={picture.latlng}
                    image={picture.image}
                    title={picture.title}
                  />
                );
              }
              return null;
            })
          : pictures.map((picture) => {
              const isBoundary =
                picture.latlng.lat > boundaryLocation?.sw.lat &&
                picture.latlng.lng > boundaryLocation?.sw.lng &&
                picture.latlng.lat < boundaryLocation?.ne.lat &&
                picture.latlng.lat < boundaryLocation?.ne.lng;
              if (isBoundary && picture.hashtags.includes(hashtag)) {
                console.log('마커 리랜더링: ', picture.title);
                return (
                  <CustomOverlayContainer
                    key={`${picture.title}-${picture.latlng}`}
                    latlng={picture.latlng}
                    image={picture.image}
                    title={picture.title}
                  />
                );
              }
              return null;
            })}
      </Map>
    </>
  );
};

export default Maps;
