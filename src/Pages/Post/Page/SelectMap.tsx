import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface ISelectMap {
  setUserLatitude: any;
  setUserLongitude: any;
  userLatitude: any;
  userLongitude: any;
}

const SelectMap = ({
  setUserLatitude,
  setUserLongitude,
  userLatitude,
  userLongitude,
}: ISelectMap) => (
  <Map
    center={{
      lat: 37.56009343411772,
      lng: 126.97692251945553,
    }}
    style={{
      width: '704px',
      height: '304px',
    }}
    level={9} // 지도의 확대 레벨
    onClick={(_t, mouseEvent) => {
      setUserLatitude(mouseEvent.latLng!.getLat());
      setUserLongitude(mouseEvent.latLng!.getLng());
    }}
  >
    {userLatitude && userLongitude && (
      <MapMarker position={{ lat: userLatitude, lng: userLongitude }} />
    )}
  </Map>
);
export default SelectMap;
