import React, { useState, useRef, useEffect } from 'react';
import * as S from './styled';
import Editor from '../../../Components/Commons/Editor';
import TagToolTip from '../Utils/Tooltip';

const PostPhoto = () => {
  const quillRef = useRef<any>();
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState('');
  const tagColor: string[] = ['#7978C6', '#7EC885', '#E6549D'];

  const handleSubmit = async () => {
    if (quillRef.current) {
      // const description = quillRef.current.getEditor().getText();
      const quill = quillRef.current.getEditor();
      const url = 'https://source.unsplash.com/user/c_v_r/300x300';
      const range = quill.getSelection()?.index;
      // console.log(description);
      // console.log(htmlContent);
      quill.clipboard.dangerouslyPasteHTML(1, `<img src=${url} alt="image" />`);
    }
  };

  const duplicateCheck = (value: string) => tagList.includes(value);

  const createTag = (value: string, type?: string) => {
    const regex = /[,]/gi;

    if (regex.test(value)) {
      const tag = value.replaceAll(',', '');
      if (tag.length < 1) return;
      if (duplicateCheck(tag)) {
        setTagInputValue('');
        return;
      }
      setTagList((prev) => {
        let ary = [...prev];
        ary = [...prev, tag];
        return ary;
      });
      setTagInputValue('');
    }

    if (type === 'enter') {
      if (value.length < 1) return;
      if (duplicateCheck(value)) {
        setTagInputValue('');
        return;
      }
      setTagList((prev) => {
        let ary = [...prev];
        ary = [...prev, value];
        return ary;
      });
      setTagInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /[,]/gi;
    if (!regex.test(value)) setTagInputValue(value);
    createTag(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (tagInputRef.current) createTag(tagInputRef.current.value, 'enter');
    }
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.TitleWrapper>
            <S.TitleArea />
            <S.BoxBorder />
            <S.TagBox>
              {tagList &&
                tagList.map((tagName: string, index: number) => (
                  <S.Tag key={index.toString() + tagName} bgColor={tagColor[2]}>
                    {tagName}
                  </S.Tag>
                ))}
              <TagToolTip title="쉼표 혹은 엔터를 이용하여 태그를 등록할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다.">
                <S.TagInput
                  ref={tagInputRef}
                  value={tagInputValue}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </TagToolTip>
            </S.TagBox>
          </S.TitleWrapper>
          <S.ContentBox>
            <S.QuillEditor>
              <Editor
                quillRef={quillRef}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
              />
            </S.QuillEditor>
          </S.ContentBox>
        </S.Wrapper>
      </S.Container>
      <S.PostFooter>
        <button onClick={handleSubmit}>click</button>
      </S.PostFooter>
    </>
  );
};

export default PostPhoto;
