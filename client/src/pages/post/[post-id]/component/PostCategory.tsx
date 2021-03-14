import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { BorderBox } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { useRouter } from 'next/router';

const FadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-1rem)'
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});

const Container = styled.nav<{ themeMode: ThemeMode }>(
  (props) => ({
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 'calc(5rem + 20px)',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: 'calc(100vh - 5rem - 20px)',
    padding: '.5rem',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0'
    },
    '@media screen and (max-width: 1380px)': {
      width: '28%',
      minWidth: '240px'
    },
    '@media screen and (max-width: 767px)': {
      width: '50%',
      minWidth: '250px',
      position: 'fixed',
      top: '5rem',
      left: 0,
      height: 'calc(100vh - 5rem)',
      backgroundColor: theme[props.themeMode].secondaryContentBackground,
      borderRadius: '0 8px 8px 0',
      boxShadow: `5px 0 4px ${theme[props.themeMode].shadowColor}`
    }
  }),
  css`
    @media screen and (max-width: 767px) {
      animation: 0.4s ${FadeIn} forwards;
    }
  `
);

const FlexWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const CategoryName = styled.p({
  fontSize: '1.4rem',
  fontWeight: 'bold',
  maxWidth: '90%',
  wordBreak: 'break-all'
});

const WriteButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '.3rem',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const TitleContainer = styled.ul({
  marginTop: '.5rem',
  padding: '0 .75rem',
  width: '100%'
});

const TitleList = styled.li({
  width: '100%',
  padding: '.2rem 0',
  margin: '.4rem 0',
  cursor: 'pointer',
  '&:hover': {
    fontWeight: 'bolder',
    textDecoration: 'underline'
  }
});

const Title = styled.span<{ bold: boolean }>((props) => ({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  fontWeight: props.bold ? 'bold' : 'normal'
}));

interface Props {
  titles: [{ title: string; _id: number }];
  currentPostId: number;
  category: { title: string };
  isLogin: boolean;
}

export default function PostCategory(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const router = useRouter();

  function handleWriteButtonClick() {
    router.push('/admin/writer');
  }

  return (
    <Container themeMode={themeMode}>
      <FlexWrapper>
        <CategoryName>{props.category.title}</CategoryName>
        {props.isLogin && (
          <WriteButton onClick={() => handleWriteButtonClick()}>
            <FontAwesomeIcon icon={faPlus} />
          </WriteButton>
        )}
      </FlexWrapper>
      <TitleContainer>
        {props.titles.map(({ title, _id }) => {
          return (
            <TitleList key={title}>
              <Link href={`/post/${_id}`} passHref>
                <Title bold={props.currentPostId === _id}>{title}</Title>
              </Link>
            </TitleList>
          );
        })}
      </TitleContainer>
    </Container>
  );
}
