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
  elementCount: number;
}

function PageButtonBox(props: Props) {
  const router = useRouter();
  const pages = useMemo<number[]>(() => {
    if (props.elementCount === 0) {
      return [1];
    }

    if (props.elementCount <= 50) {
      if (props.elementCount % props.elementsInPage === 0) {
        return [...Array(props.elementCount / props.elementsInPage).keys()].map((i) => i + 1);
      }

      return [...Array(Math.floor(props.elementCount / props.elementsInPage) + 1).keys()].map((i) => i + 1);
    }

    if (props.currPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (props.elementCount % props.elementsInPage === 0 && props.currPage >= Math.floor(props.elementCount / props.elementsInPage) - 2) {
      return [...Array(5).keys()].map((i) => i + Math.floor(props.elementCount / props.elementsInPage) - 4);
    }

    if (props.currPage >= Math.floor(props.elementCount / props.elementsInPage) - 1) {
      return [...Array(5).keys()].map((i) => i + Math.floor(props.elementCount / props.elementsInPage) - 3);
    }

    return [...Array(5).keys()].map((i) => i + props.currPage - 2);
  }, [props.currPage, props.elementCount, props.elementsInPage]);

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
          if (props.elementCount % props.elementsInPage === 0 && props.currPage === Math.floor(props.elementCount / props.elementsInPage)) {
            return;
          } else if (props.currPage === Math.floor(props.elementCount / props.elementsInPage) + 1) {
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
