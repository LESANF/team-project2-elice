import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import * as S from './styled';

const URL = 'http://34.64.34.184:5001';

// 인터페이스
interface ILatLng {
  lat: number;
  lng: number;
}

interface ICustomOverlayContainerProps {
  lat: number;
  lng: number;
  image: string;
  postId: number;
}

interface IImageProps {
  src: string;
  alt: string;
  postId: number;
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
const Image = ({ src, alt, postId }: IImageProps) => {
  const handleImage = () => {
    console.log(`${postId} 상세페이지로 이동`);
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
  lat,
  lng,
  image,
  postId,
}: ICustomOverlayContainerProps) => (
  <CustomOverlayMap
    position={{
      lat,
      lng,
    }}
  >
    {/* 커스텀 오버레이에 표시할 내용입니다 */}
    <S.CustomOverlayStyle>
      <Image src={image} alt={image} postId={postId} />
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
  const [markers, setMarkers] = useState<Array<object>>([]);

  useEffect(() => {
    const data = {
      latlng: boundaryLocation,
    };
    const fetchBoundaryPosts = async () => {
      const response = await axios.post(`${URL}/posts/map`, data);
      return response;
    };
    try {
      const response = fetchBoundaryPosts();
      response.then((res) => {
        const posts = res.data.data;
        setMarkers(() => [...posts]);
      });
    } catch (err) {
      console.error('api요청에러: ', err);
    }
  }, [boundaryLocation]);

  // 충우님 header input 코드
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
          ? markers.map((marker: any) => {
              const isBoundary =
                marker.latitude > boundaryLocation?.sw.lat &&
                marker.longitude > boundaryLocation?.sw.lng &&
                marker.latitude < boundaryLocation?.ne.lat &&
                marker.latitude < boundaryLocation?.ne.lng;
              if (isBoundary) {
                return (
                  <CustomOverlayContainer
                    key={marker.postId}
                    lat={marker.latitude}
                    lng={marker.longitude}
                    image={marker.imageURL}
                    postId={marker.postId}
                  />
                );
              }
              return null;
            })
          : markers.map((marker: any) => {
              const isBoundary =
                marker.latitude > boundaryLocation?.sw.lat &&
                marker.longitude > boundaryLocation?.sw.lng &&
                marker.latitude < boundaryLocation?.ne.lat &&
                marker.latitude < boundaryLocation?.ne.lng;
              if (isBoundary && marker.hashtag?.includes(hashtag)) {
                return (
                  <CustomOverlayContainer
                    key={marker.postId}
                    lat={marker.latitude}
                    lng={marker.longitude}
                    image={marker.imageURL}
                    postId={marker.postId}
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
