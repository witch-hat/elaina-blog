import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import gfm from 'remark-gfm';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RefInputBox, useWidth, Loading } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CategoryDetailType } from 'src/query/category';
import { EDIT_POST, WRITE_POST } from 'src/query/post';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';
import styles from 'src/styles/markdown-styles.module.css';

import { Menu } from './Menu';
import { CategorySelector } from './CategorySelector';

const Container = styled.div({
  display: 'flex',
  width: '100%'
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

const Editor = styled.div((props) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: '.75rem',
  height: 'calc(100vh - 8.75rem - 40px)',
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
  borderRadius: '.5rem',
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

const WriteButton = styled.button<{ available: boolean }>((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.theme.submitButton.buttonColor,
  color: props.theme.submitButton.textColor,
  cursor: props.available ? 'pointer' : 'not-allowed'
}));

function Text(props: { children?: string }) {
  return <Paragraph>{props.children !== undefined ? props.children : <br></br>}</Paragraph>;
}

enum Mode {
  write = 'Editor',
  preview = 'Preview'
}

const DEFAULT_CATEGORY = '최신글';

interface Props {
  author: string;
  categories: CategoryDetailType[];
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
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [visibleSubmitBtn, setVisibleSubmitBtn] = useState(true);

  const client = useApollo();
  const [writePost, { loading: writeLoading }] = useMutation(WRITE_POST);
  const [editPost, { loading: editLoading }] = useMutation(EDIT_POST);

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

  function changeCategory(newCategory: string) {
    setSelectedCategory(newCategory);
  }

  async function handleCreatePost() {
    setVisibleSubmitBtn(false);

    // if (selectedCategory === DEFAULT_CATEGORY) {
    //   window.scrollTo(0, 0);
    //   alert('카테고리를 선택해 주세요');
    //   setVisibleSubmitBtn(true);
    //   return;
    // }

    if (!title) {
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      alert('제목을 입력해주세요');
      setVisibleSubmitBtn(true);
      return;
    }

    if (!article) {
      editor.current?.focus();
      alert('본문을 1글자 이상 써주세요');
      setVisibleSubmitBtn(true);
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
          category: selectedCategory === DEFAULT_CATEGORY ? '' : selectedCategory
        }
      });

      router.push(`/post/${mutateData.data.writePost._id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEditPost() {
    setVisibleSubmitBtn(false);

    if (!title) {
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      alert('제목을 입력해주세요');
      setVisibleSubmitBtn(true);
      return;
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
      setVisibleSubmitBtn(true);
      alert(err.message);
      return;
    }
  }

  if (writeLoading || editLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <EditorContainer>
        <MoblieModeButton onClick={() => handleButtonClick()}>{mode === Mode.write ? Mode.preview : Mode.write}</MoblieModeButton>
        {((width <= 767 && mode === Mode.write) || width > 767) && (
          <>
            <CategorySelector
              categories={props.categories}
              default={DEFAULT_CATEGORY}
              selectedCategory={selectedCategory}
              changeCategory={changeCategory}
            />
            <Title>
              <RefInputBox
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
            >
              <Text></Text>
            </Editor>
            <ButtonContainer>
              <WriteButton
                available={visibleSubmitBtn}
                onClick={() => {
                  if (visibleSubmitBtn) {
                    props.isEdit ? handleEditPost() : handleCreatePost();
                  }
                }}
              >
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
