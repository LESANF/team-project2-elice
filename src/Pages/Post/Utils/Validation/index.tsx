export const validationFunc = (dataList: any) => {
  console.log(dataList);
  const replaceName = (prevData: any) => {
    switch (prevData) {
      case 'title':
        return '제목';
        break;
      case 'content':
        return '내용';
        break;
      case 'imageUrlId':
        return '사진';
        break;
      case 'cameraId':
        return '카메라 모델';
        break;
      case 'latitude':
        return '위치';
        break;
      case 'longitude':
        return '위치';
        break;
      case 'locationInfo':
        return '사진 설명';
        break;
      case 'takenAt':
        return '촬영일';
        break;
      case 'hashtags':
        return '태그';
        break;

      default:
        break;
    }
  };

  for (const property in dataList) {
    if (dataList[property] === undefined) {
      return {
        result: false,
        errMsg: `${replaceName(property)}을(를) 입력해주세요`,
      };
    }
    if (
      (property === 'cameraId' && dataList[property] === 0) ||
      (property === 'cameraId' && dataList[property] === null)
    ) {
      return { result: false, errMsg: '카메라 모델을(를) 선택해주세요' };
    }
    if (property === 'hashtags' && dataList[property] === 0) {
      return { result: false, errMsg: '태그을(를) 입력해주세요' };
    }
    if (property === 'title' && dataList[property] === '') {
      return { result: false, errMsg: '제목을(를) 입력해주세요' };
    }
    if (property === 'locationInfo' && dataList[property] === '') {
      return { result: false, errMsg: '사진 설명을(를) 입력해주세요' };
    }
  }
  return { result: true, errMsg: '' };
};
