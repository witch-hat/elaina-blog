import React, { useState, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import { Editor as EditorType } from '@toast-ui/react-editor';

import { NoRefInputBox } from 'src/components';
import { CategoryDetailType } from 'src/query/category';

import { CategorySelector } from './CategorySelector';
import { ForwardedToastEditor as Editor } from './ToastEditorWrapper';

const Container = styled.div({
  display: 'flex',
  width: '900px',
  margin: '0 auto',
  alignSelf: 'stretch',
  flexDirection: 'column'
});

const Title = styled.div({
  display: 'flex',
  width: '100%',
  margin: '1rem 0',
  alignItems: 'center'
});

const MenuContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const ButtonContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  margin: '.5rem 0'
});

const WriteButton = styled.button((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.theme.submitButton.buttonColor,
  color: props.theme.submitButton.textColor
}));

export enum Mode {
  Write = 'Editor',
  Preview = 'Preview'
}

export interface PostInfo {
  title: string;
  article: string;
  category: string;
}

const DEFAULT_CATEGORY = '최신글';

interface Props {
  author: string;
  categories: CategoryDetailType[];
  handleSubmit: (postInfo: PostInfo, defaultCategory: string) => Promise<any>;
  submitText: string;
  category?: string;
  title?: string;
  article?: string;
}

export function WriterLayout(props: Props) {
  const editorRef = useRef<EditorType>(null);
  const [title, setTitle] = useState(props.title || '');
  const [article, setArticle] = useState<string>(props.article || '');
  const [selectedCategory, setSelectedCategory] = useState(props.category || DEFAULT_CATEGORY);

  function changeCategory(newCategory: string) {
    setSelectedCategory(newCategory);
  }

  function handleChange() {
    if (!editorRef.current) {
      return;
    }
    const instance = editorRef.current.getInstance();
    setArticle(instance.getMarkdown());
  }

  async function handleSubmit() {
    const info: PostInfo = {
      title,
      article,
      category: selectedCategory
    };
    await props.handleSubmit(info, DEFAULT_CATEGORY);
  }

  return (
    <Container>
      <MenuContainer>
        <CategorySelector
          categories={props.categories}
          default={DEFAULT_CATEGORY}
          selectedCategory={selectedCategory}
          changeCategory={changeCategory}
        />
        <Title>
          <NoRefInputBox
            id='post-title'
            type='text'
            minLength={2}
            maxLength={999}
            placeholder='제목'
            styles={{ width: '100%' }}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
          />
        </Title>
      </MenuContainer>
      <div style={{ flex: 1, backgroundColor: '#fff' }}>
        <Editor
          ref={editorRef}
          initialValue={article || ''}
          placeholder='Write your story...'
          hideModeSwitch={true}
          onChange={handleChange}
          height={'100%'}
        />
      </div>
      <ButtonContainer>
        <WriteButton onClick={handleSubmit}>{props.submitText}</WriteButton>
      </ButtonContainer>
    </Container>
  );
}
