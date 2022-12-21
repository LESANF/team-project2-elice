import { MouseEventHandler, useState, Dispatch, SetStateAction } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from './styled';

// 임시 사용자 사진 데이터
const pictures = [
  {
    title: '카카오',
    latlng: { lat: 33.450705, lng: 126.570677 },
    image: 'img-1',
    hashtags: ['돈까스', '짜장면', '마라탕', '스시'],
  },
  {
    title: '생태연못',
    latlng: { lat: 33.450936, lng: 126.569477 },
    image: 'img-2',
    hashtags: ['스시'],
  },
  {
    title: '텃밭',
    latlng: { lat: 33.450879, lng: 126.56994 },
    image: 'img-3',
    hashtags: ['마라탕'],
  },
  {
    title: '근린공원',
    latlng: { lat: 33.452393, lng: 126.570738 },
    image: 'img-4',
    hashtags: ['짜장면', '마라탕'],
  },
  {
    title: '광장계단',
    latlng: { lat: 33.452593, lng: 126.574738 },
    image: 'img-5',
    hashtags: ['짜장면', '마라탕', '스시'],
  },
  {
    title: '광진구청',
    latlng: { lat: 33.452393, lng: 126.572038 },
    image: 'img-6',
    hashtags: ['짬뽕', '스시', '피자', '햄버거', '쌀국수', '카레'],
  },
  {
    title: '간선2로',
    latlng: { lat: 33.452705, lng: 126.571677 },
    image: 'img-7',
    hashtags: ['돈까스', '짜장면', '마라탕', '스시'],
  },
  {
    title: '석상타워',
    latlng: { lat: 33.450136, lng: 126.567477 },
    image: 'img-8',
    hashtags: ['스시', '떡볶이', '족발'],
  },
  {
    title: '붉은역',
    latlng: { lat: 33.449879, lng: 126.56694 },
    image: 'img-9',
    hashtags: ['마라탕', '치킨'],
  },
  {
    title: '독일마을',
    latlng: { lat: 33.451393, lng: 126.573738 },
    image: 'img-10',
    hashtags: ['짜장면', '마라탕', '족발'],
  },
  {
    title: '제주대학',
    latlng: { lat: 33.451793, lng: 126.567138 },
    image: 'img-11',
    hashtags: ['떡볶이', '스시', '비빔밥'],
  },
  {
    title: '제주숲',
    latlng: { lat: 33.449293, lng: 126.569738 },
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
    latlng: { lat: 33.451805, lng: 126.569177 },
    image: 'img-13',
    hashtags: ['돈까스', '햄버거', '피자', '치킨'],
  },
  {
    title: '안개마을',
    latlng: { lat: 33.451936, lng: 126.569799 },
    image: 'img-14',
    hashtags: ['스시', '비빔밥', '라멘', '삼겹살'],
  },
  {
    title: '전포카페거리',
    latlng: { lat: 33.449879, lng: 126.572041 },
    image: 'img-15',
    hashtags: ['마라탕', '삼겹살', '짬뽕'],
  },
  {
    title: '은아숲',
    latlng: { lat: 33.449579, lng: 126.572945 },
    image: 'img-16',
    hashtags: ['짜장면', '마라탕'],
  },
  {
    title: '나귀마을',
    latlng: { lat: 33.451593, lng: 126.572738 },
    image: 'img-17',
    hashtags: ['짜장면', '마라탕', '스시'],
  },
  {
    title: '노을바다',
    latlng: { lat: 33.451993, lng: 126.575738 },
    image: 'img-18',
    hashtags: ['짬뽕', '스시', '피자', '햄버거', '쌀국수', '카레'],
  },
];

interface LatLng {
  lat: number;
  lng: number;
}

interface CustomOverlayContainerProps {
  latlng: LatLng;
  image: string;
  title: string;
}

interface ImageProps {
  src: string;
  alt: string;
  title: string;
}

interface HashTagProps {
  hashtag: string;
  setHashtag: Dispatch<SetStateAction<string>>;
}

// [2022-12-19] 추후 실제 게시물페이지와 연동할 때 여기 이벤트를 수정해주면 된다.
const Image = ({ src, alt, title }: ImageProps) => {
  const handleImage = () => {
    console.log('🚀 ~ file: index.tsx:51 ~ handleImage ~ title', title);
  };
  return (
    <img
      src={src}
      alt={alt}
      onClick={(e) => {
        handleImage();
      }}
      role="presentation"
    />
  );
};

const HashTag = ({ hashtag, setHashtag }: HashTagProps) => (
  <span onClick={(e) => setHashtag('')} role="presentation">
    {hashtag}
  </span>
);

const CustomOverlayContainer = ({
  latlng,
  image,
  title,
}: CustomOverlayContainerProps) => (
  <CustomOverlayMap
    position={{
      lat: latlng.lat,
      lng: latlng.lng,
    }}
  >
    {/* 커스텀 오버레이에 표시할 내용입니다 */}
    <S.CustomOverlayStyle>
      <Image src={`images/${image}.jpg`} alt={`${title}-img`} title={title} />
    </S.CustomOverlayStyle>
  </CustomOverlayMap>
);

// 임시 SearchBar 컴포넌트입니다. 추후 헤더에 있는 input으로 대체할 것입니다.
const SearchBar = ({ hashtag, setHashtag }: HashTagProps) => {
  const [searchBarInput, setSearchBarInput] = useState('');

  const handleSearchBarButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHashtag(`${searchBarInput}`);
    setSearchBarInput('');
  };

  return (
    <>
      <input
        type="text"
        value={searchBarInput}
        onChange={(e) => setSearchBarInput(e.target.value)}
      />
      <button type="button" onClick={handleSearchBarButton}>
        검색
      </button>
      {hashtag && (
        <S.HashTagStyle>
          <HashTag hashtag={hashtag} setHashtag={setHashtag} />
        </S.HashTagStyle>
      )}
    </>
  );
};

const Kakao = () => {
  const [hashtag, setHashtag] = useState('');

  return (
    <>
      <SearchBar hashtag={hashtag} setHashtag={setHashtag} />
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
      >
        {hashtag === ''
          ? pictures.map((picture) => (
              <CustomOverlayContainer
                key={`${picture.title}-${picture.latlng}`}
                latlng={picture.latlng}
                image={picture.image}
                title={picture.title}
              />
            ))
          : pictures.map((picture) => {
              if (picture.hashtags.includes(hashtag)) {
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

export default Kakao;
