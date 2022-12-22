import React, { useState, useRef } from 'react';
import * as S from './styled';
import Editor from '../../../Components/Commons/Editor';

const PostPhoto = () => {
  const tagRef = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useState<string[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      console.log('create tag');
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.TitleWrapper>
          <S.TitleArea />
          <S.BoxBorder />
          <S.TagBox>
            <S.TagInput
              ref={tagRef}
              // onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </S.TagBox>
        </S.TitleWrapper>
        <S.ContentBox>
          <S.QuillEditor>
            <Editor />
          </S.QuillEditor>
        </S.ContentBox>
      </S.Wrapper>
      <S.PostFooter />
    </S.Container>
  );
};

export default PostPhoto;
