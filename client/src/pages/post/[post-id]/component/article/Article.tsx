import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import styles from 'src/styles/MarkdownStyles.module.css';
import { ModalWrapper } from 'src/components';
import { DELETE_POST, FIND_SAME_CATEGORY_POSTS } from 'src/query/post';
import { IS_AUTH } from 'src/query/user';
import { useApollo } from 'src/apollo/apolloClient';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ProfileType } from 'src/query/profile';

import { ContentMenu } from './ArticleMenu';
import { DELETE_POST_ALL_COMMENT_LOG } from 'src/query/comment-log';

const Container = styled.main({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 5rem - 40px)',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.title({
  display: 'block',
  width: '100%',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 767px)': {
    fontSize: '2rem'
  }
});

const StyledArticle = styled.article({
  width: '100%',
  marginTop: '2rem',
  fontSize: '1.1rem',
  wordBreak: 'keep-all'
});

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

const ModalButton = styled.button<{ delete?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.delete ? props.theme.dangerButtonColor : 'inherit',
  color: props.delete ? props.theme.dangerContentText : 'inherit'
}));

interface Props {
  title: string;
  profile: ProfileType;
  createdAt: number;
  article: string;
  isLogin: boolean;
}

export function Article(props: Props) {
  const time = new Date(props.createdAt);
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApollo();
  const [deletePost] = useMutation(DELETE_POST);
  const [deletePostAllCommentLog] = useMutation(DELETE_POST_ALL_COMMENT_LOG);

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

        await deletePostAllCommentLog({
          variables: {
            postId: +id
          }
        });
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
      <ContentMenu isLogin={props.isLogin} time={time} profile={props.profile} id={id as string} setIsModalOpen={setIsModalOpen} />
      <StyledArticle>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']}>
          {props.article}
        </ReactMarkdown>
      </StyledArticle>
      <ModalWrapper visible={isModalOpen}>
        <ModalContainer>
          <ModalParagraph>정말 삭제하시겠습니까?</ModalParagraph>
          <ModalButtonContainer>
            <ModalButton
              onClick={() => {
                setIsModalOpen(false);
                handleDeleteButtonClick();
              }}
              delete
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
