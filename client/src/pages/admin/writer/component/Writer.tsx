import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import styles from 'src/styles/MarkdownStyles.module.css';
import gfm from 'remark-gfm';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { InputBox, useWidth, FocusWrapper } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CategoryDetails } from 'src/query/category';
import { EDIT_POST, WRITE_POST } from 'src/query/post';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

import { Menu } from './Menu';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%'
}));

const CategoryContainer = styled.div({
  position: 'relative',
  cursor: 'pointer',
  padding: '.5rem 0',
  border: '1px solid #1f1f1f',
  borderRadius: '.5rem'
});

const CategoryList = styled.div({
  position: 'absolute',
  top: '.5rem',
  left: '-1px',
  border: '1px solid #1f1f1f',
  backgroundColor: '#f1f2f3',
  zIndex: 1,
  borderRadius: '.5rem'
});

const CategoryTitle = styled.div({
  padding: '.5rem .2rem'
});

const Title = styled.div({
  width: '100%',
  margin: '1rem 0'
});

const EditorContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
});

const Editor = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: '.75rem',
  height: 'calc(100vh - 8.75rem - 40px)',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '.5rem',
  border: `1px solid ${theme[props.themeMode].borderColor}`,
  borderRadius: '12px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto',
  backgroundColor: theme[props.themeMode].editorBackground
}));

const PreviewContainer = styled.div({
  display: 'flex',
  flex: '1',
  height: 'calc(100vh - 5rem - 40px)',
  marginLeft: '2rem',
  padding: '.5rem',
  overflowY: 'auto',
  '@media screen and (max-width: 767px)': {
    display: 'none'
  }
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap'
});

const MoblieModeButton = styled.button({
  borderRadius: '8px',
  padding: '.3rem',
  display: 'none',
  '@media screen and (max-width: 767px)': {
    display: 'block'
  }
});

const ButtonContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  margin: '.5rem 0'
});

const WriteButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

function Text(props: { children?: string }) {
  return <Paragraph>{props.children !== undefined ? props.children : <br></br>}</Paragraph>;
}

enum Mode {
  write = 'Editor',
  preview = 'Preview'
}

const DEFAULT_CATEGORY = '카테고리를 선택해 주세요';

interface Props {
  author: string;
  categories: CategoryDetails[];
  category?: string;
  title?: string;
  article?: string;
  isEdit?: boolean;
}

export function Writer(props: Props) {
  const width = useWidth();
  const router = useRouter();
  const editor = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(Mode.write);
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  const client = useApollo();
  const [writePost] = useMutation(WRITE_POST);
  const [editPost] = useMutation(EDIT_POST);

  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  useEffect(() => {
    if (mode == Mode.write) {
      editor.current?.focus();
    }
  }, [mode]);

  useEffect(() => {
    if (props.title && titleRef.current) {
      setTitle(props.title);
      titleRef.current.value = props.title;
    }

    if (props.article && editor.current) {
      setArticle(props.article);
      editor.current.textContent = props.article;
    }

    if (props.category) {
      setSelectedCategory(props.category);
    }
  }, []);

  function parseTextContent() {
    if (editor.current !== null) {
      setArticle(editor.current.innerText.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Backspace') {
      if (editor.current?.textContent?.length === 0 && editor.current.childNodes.length === 1) {
        e.preventDefault();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const clipedData = e.clipboardData.getData('text/plain').replaceAll('&#8203;', '');
    console.log(clipedData.split('').map((t) => t === ''));
    document.execCommand('insertText', false, clipedData);
  }

  function handleButtonClick() {
    if (mode === Mode.write) {
      setMode(Mode.preview);
    } else {
      setMode(Mode.write);
    }
  }

  async function handleCreatePost() {
    if (selectedCategory === DEFAULT_CATEGORY) {
      window.scrollTo(0, 0);
      alert('카테고리를 선택해 주세요');
      return;
    }

    if (!title) {
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      alert('제목을 입력해주세요');
      return;
    }

    if (!article) {
      editor.current?.focus();
      alert('본문을 1글자 이상 써주세요');
      return;
    }

    const { data } = await client.query({ query: IS_AUTH });
    const isAdmin = data.isAuth.isAuth;

    if (!isAdmin) {
      alert('로그인에러. 다시 로그인해주세요.');
      router.push('/admin/login');
      return;
    }

    try {
      const mutateData = await writePost({
        variables: {
          title,
          createdAt: new Date().toISOString(),
          article,
          category: selectedCategory
        }
      });

      router.push(`/post/${mutateData.data.writePost._id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEditPost() {
    if (!title) {
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      return alert('제목을 입력해주세요');
    }

    const { data } = await client.query({ query: IS_AUTH });
    const isAdmin = data.isAuth.isAuth;

    if (!isAdmin) {
      alert('로그인에러. 다시 로그인해주세요.');
      return router.push('/admin/login');
    }

    const id = +router.query['post-id'];

    try {
      await editPost({
        variables: {
          id,
          title,
          article,
          category: selectedCategory
        }
      });

      router.push(`/post/${id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Container themeMode={themeMode}>
      <EditorContainer>
        <MoblieModeButton onClick={() => handleButtonClick()}>{mode === Mode.write ? Mode.preview : Mode.write}</MoblieModeButton>
        {((width <= 767 && mode === Mode.write) || width > 767) && (
          <>
            <CategoryContainer>
              <div onClick={() => setIsListOpen(!isListOpen)}>
                <p style={{ padding: '.2rem' }}>{selectedCategory}</p>
              </div>
              <FocusWrapper visible={isListOpen} onClickOutside={() => setIsListOpen(false)}>
                <CategoryList>
                  {props.categories.map((category) => {
                    return (
                      <CategoryTitle
                        key={category.title}
                        onClick={() => {
                          setSelectedCategory(category.title);
                          setIsListOpen(false);
                        }}
                      >
                        <p>{category.title}</p>
                      </CategoryTitle>
                    );
                  })}
                </CategoryList>
              </FocusWrapper>
            </CategoryContainer>
            <Title>
              <InputBox
                ref={titleRef}
                id='post-title'
                type='text'
                minLength={2}
                maxLength={999}
                placeholder='제목'
                styles={{ width: '100%' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.currentTarget.value);
                }}
              />
            </Title>
            <Menu ref={editor} setArticle={setArticle} />
            <Editor
              ref={editor}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onInput={parseTextContent}
              themeMode={themeMode}
            >
              <Text></Text>
            </Editor>
            <ButtonContainer>
              <WriteButton themeMode={themeMode} onClick={props.isEdit ? () => handleEditPost() : () => handleCreatePost()}>
                {props.isEdit ? '수정' : '글쓰기'}
              </WriteButton>
            </ButtonContainer>
          </>
        )}
        {width <= 767 && mode === Mode.preview && (
          <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={article}></ReactMarkdown>
        )}
      </EditorContainer>
      <PreviewContainer>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={article}></ReactMarkdown>
      </PreviewContainer>
    </Container>
  );
}
