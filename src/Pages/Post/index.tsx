import * as S from './styled';
import Editor from '../../Components/Commons/Editor';

const PostPhoto = () => (
  <S.Container>
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleArea />
        <S.BoxBorder />
        <S.TagBox>
          <S.TagInput />
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

export default PostPhoto;
