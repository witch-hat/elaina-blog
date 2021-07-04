import styled from 'styled-components';

import { CategoryDetails } from 'src/query/category';

const Container = styled.div({
  width: '300px'
});

const CategoryTitle = styled.p({
  display: '-webkit-box',
  width: '100%',
  padding: '0 .5rem',
  wordBreak: 'break-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  categories: CategoryDetails[];
}

export function CategoryContainer(props: Props) {
  return (
    <Container>
      {props.categories.map((category) => {
        return <CategoryTitle>{category.title}</CategoryTitle>;
      })}
    </Container>
  );
}
