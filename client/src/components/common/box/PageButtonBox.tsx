import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Container = styled.div({
  display: 'flex'
});

const Button = styled.button<{ isClicked?: boolean }>((props) => ({
  display: 'flex',
  width: '2rem',
  height: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  color: props.isClicked ? '#ccdd00' : 'inherit',
  border: 'none',

  '&:hover': {
    color: '#ff0000'
  }
}));

const Wrapper = styled.div({
  display: 'flex',
  width: '10rem',
  justifyContent: 'center'
});

interface Props {
  elementsInPage: number;
  currPage: number;
  elementsTotalCount: number;
}

function PageButtonBox(props: Props) {
  const router = useRouter();
  const pages = useMemo<number[]>(() => {
    if (props.elementsTotalCount === 0) {
      return [1];
    }

    const isTotalDividePage = props.elementsTotalCount % props.elementsInPage === 0;
    const rawPage = props.elementsTotalCount / props.elementsInPage;

    if (props.elementsTotalCount <= 50) {
      if (isTotalDividePage) {
        return [...Array(rawPage).keys()].map((i) => i + 1);
      }

      return [...Array(Math.floor(rawPage) + 1).keys()].map((i) => i + 1);
    }

    if (props.currPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (isTotalDividePage && props.currPage >= Math.floor(rawPage) - 2) {
      return [...Array(5).keys()].map((i) => i + Math.floor(rawPage) - 4);
    }

    if (props.currPage >= Math.floor(rawPage) - 1) {
      return [...Array(5).keys()].map((i) => i + Math.floor(rawPage) - 3);
    }

    return [...Array(5).keys()].map((i) => i + props.currPage - 2);
  }, [props.currPage, props.elementsTotalCount, props.elementsInPage]);

  return (
    <Container>
      <Button
        onClick={() => {
          if (props.currPage === 1) {
            return;
          }
          router.push({ pathname: router.pathname, query: { ...router.query, page: props.currPage - 1 } });
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Wrapper>
        {pages.map((page) => (
          <Button
            key={`page-${page}`}
            isClicked={page === props.currPage}
            onClick={() => {
              if (props.currPage === page) {
                return;
              }
              router.push({ pathname: router.pathname, query: { ...router.query, page } });
            }}
          >
            {page}
          </Button>
        ))}
      </Wrapper>
      <Button
        onClick={() => {
          if (
            props.elementsTotalCount % props.elementsInPage === 0 &&
            props.currPage === Math.floor(props.elementsTotalCount / props.elementsInPage)
          ) {
            return;
          } else if (props.currPage === Math.floor(props.elementsTotalCount / props.elementsInPage) + 1) {
            return;
          }

          router.push({ pathname: router.pathname, query: { ...router.query, page: props.currPage } });
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Container>
  );
}

export const MemoizedPageButtonBox = React.memo(PageButtonBox);
