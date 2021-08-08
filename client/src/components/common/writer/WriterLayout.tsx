import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import gfm from 'remark-gfm';

import { NoRefInputBox } from 'src/components';
import { CategoryDetailType } from 'src/query/category';
import styles from 'src/styles/markdown-styles.module.css';

import { Menu } from './Menu';
import { CategorySelector } from './CategorySelector';

const Container = styled.div({
  width: '900px',
  margin: '0 auto'
});

const Title = styled.div({
  width: '100%',
  margin: '1rem 0'
});

const MenuContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
});

const Editor = styled.textarea((props) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  height: 'calc(100vh - 5rem - 40px)',
  marginTop: '.75rem',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '.5rem',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '.5rem',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto',
  backgroundColor: props.theme.editorBackground
}));

const ArticleContainer = styled.div({
  minHeight: 'calc(100vh - 5rem - 40px)'
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
  handleSubmit: (postInfo: PostInfo, defaultCategory: string) => Promise<void>;
  submitText: string;
  category?: string;
  title?: string;
  article?: string;
}

export function WriterLayout(props: Props) {
  const editor = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState(Mode.Write);
  const [title, setTitle] = useState(props.title || '');
  const [article, setArticle] = useState<string>(props.article || '');
  const [selectedCategory, setSelectedCategory] = useState(props.category || DEFAULT_CATEGORY);

  useEffect(() => {
    if (mode == Mode.Write) {
      editor.current?.focus();
    }
  }, [mode]);

  function parseTextContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setArticle(e.target.value.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Backspace') {
      if (editor.current?.textContent?.length === 0 && editor.current.childNodes.length === 1) {
        e.preventDefault();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const clipedData = e.clipboardData.getData('text/plain').replaceAll('&#8203;', '');
    document.execCommand('insertText', false, clipedData);
  }

  function changeCategory(newCategory: string) {
    setSelectedCategory(newCategory);
  }

  function changeMode() {
    if (mode === Mode.Preview) {
      setMode(Mode.Write);
    } else {
      setMode(Mode.Preview);
    }
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
        <Menu ref={editor} setArticle={setArticle} mode={mode} changeMode={changeMode} />
      </MenuContainer>
      <ArticleContainer>
        {mode === Mode.Write ? (
          <Editor ref={editor} onKeyDown={handleKeyDown} onPaste={handlePaste} onChange={parseTextContent} value={article} />
        ) : (
          <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']}>
            {article || 'Nothing to preview'}
          </ReactMarkdown>
        )}
      </ArticleContainer>
      <ButtonContainer>
        <WriteButton onClick={handleSubmit}>{props.submitText}</WriteButton>
      </ButtonContainer>
    </Container>
  );
}
