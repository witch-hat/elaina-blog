import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import styles from 'src/styles/MarkdownStyles.module.css';
import { ModalWrapper, DropDownMenu } from 'src/components';
import { DELETE_POST, FIND_SAME_CATEGORY_POSTS } from 'src/query/post';
import { IS_AUTH } from 'src/query/user';
import { useApollo } from 'src/apollo/apolloClient';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { FormatUnifier } from 'src/utils';
import { trans, Lang } from 'src/resources/languages';

const Container = styled.section({
  width: '800px',
  display: 'flex',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 5rem - 40px)',
  '@media screen and (max-width: 1380px)': {
    width: '100%'
  },
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.header({
  width: '100%',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 767px)': {
    fontSize: '2rem'
  }
});

const Menu = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '2.2rem',
  alignItems: 'center',
  fontSize: '.875rem'
});

const Article = styled.article({
  width: '100%',
  marginTop: '2rem',
  fontSize: '1.1rem',
  wordBreak: 'keep-all'
});

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center'
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

const MenuButton = styled.p<{ danger?: boolean }>((props) => ({
  display: 'block',
  padding: '.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  wordBreak: 'keep-all',
  borderRadius: '.5rem',
  color: props.danger ? '#dd0000' : 'inherit',
  '&:hover': {
    backgroundColor: '#ddd'
  }
}));

const ModalContainer = styled.div({
  width: '20rem',
  padding: '.5rem'
});

const ModalParagraph = styled.p({
  width: '100%'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ themeMode?: ThemeMode }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  marginLeft: '.5rem',
  backgroundColor: props.themeMode ? theme[props.themeMode].dangerButtonColor : 'inherit',
  color: props.themeMode ? theme[props.themeMode].dangerContentText : 'inherit'
}));

interface Props {
  title: string;
  author: string;
  createdAt: string;
  article: string;
  isLogin: boolean;
}

export function Content(props: Props) {
  const time = new Date(props.createdAt);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApollo();
  const [deletePost] = useMutation(DELETE_POST);

  const id = router.query['post-id'];

  async function handleDeleteButtonClick() {
    const authResponse = await client.query({ query: IS_AUTH });

    const isAdmin = authResponse.data.isAuth.isAuth;

    if (isAdmin) {
      try {
        const deleteResponse = await deletePost({
          variables: {
            id: +id
          }
        });

        const categoryId = deleteResponse.data.deletePost.categoryId;

        const { data } = await client.query({ query: FIND_SAME_CATEGORY_POSTS, variables: { categoryId } });
        if (data.findSameCategoryPosts.post.length === 0) {
          router.push('/');
        } else {
          const lastPostId = data.findSameCategoryPosts.post[data.findSameCategoryPosts.post.length - 1]._id;
          router.push(`/post/${lastPostId}`);
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      return alert('Invalid User');
    }
  }

  return (
    <Container>
      <Title>{props.title}</Title>
      <Menu>
        <ContentInfoWrapper>
          <Author>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
            {props.author}
          </Author>
          <Time>
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
            {FormatUnifier.getFullFormatDate(time)}
          </Time>
        </ContentInfoWrapper>
        {props.isLogin && (
          <DropDownMenu
            visible={isOpenMenu}
            mainButton={<FontAwesomeIcon icon={faEllipsisV} />}
            setVisible={setIsOpenMenu}
            dropMenu={
              <>
                <MenuButton>
                  <Link href={`/post/${id}/edit`}>{trans(Lang.Edit)}</Link>
                </MenuButton>
                <MenuButton danger onClick={() => setIsModalOpen(true)}>
                  {trans(Lang.Delete)}
                </MenuButton>
              </>
            }
          />
        )}
      </Menu>
      <Article>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']}>
          {props.article}
        </ReactMarkdown>
      </Article>
      <ModalWrapper visible={isModalOpen}>
        <ModalContainer>
          <ModalParagraph>정말 삭제하시겠습니까?</ModalParagraph>
          <ModalButtonContainer>
            <ModalButton
              onClick={() => {
                setIsModalOpen(false);
                handleDeleteButtonClick();
              }}
              themeMode={themeMode}
            >
              예
            </ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)}>아니요</ModalButton>
          </ModalButtonContainer>
        </ModalContainer>
      </ModalWrapper>
    </Container>
  );
}
