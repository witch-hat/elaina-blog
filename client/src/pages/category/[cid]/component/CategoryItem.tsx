import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Container = styled.li<{ isSelected: boolean }>((props) => ({
  width: '100%',
  padding: '.5rem 0',
  borderLeft: props.isSelected ? '2px solid #867dff' : 'none',
  borderBottom: `1px solid #000`,
  fontWeight: props.isSelected ? 'bold' : 'normal',
  color: props.isSelected ? '#867dff' : 'inherit',
  textDecoration: props.isSelected ? 'underline' : 'none',
  listStyle: 'none',
  transition: '.2s all',
  '&:hover': {
    color: 'inherit',
    marginLeft: '.35rem',
    borderLeft: '2px solid #000',
    cursor: 'pointer'
  }
}));

const CategoryTitle = styled.p({
  display: '-webkit-box',
  width: '100%',
  padding: '0 .5rem',
  wordBreak: 'break-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    cursor: 'pointer'
  }
});

interface Props {
  title: string;
  id: number;
}

export function CategoryItem(props: Props) {
  const router = useRouter();
  const id = router.asPath.split('/')[2];

  return (
    <Container isSelected={props.id === +id}>
      {props.id === +id ? (
        <CategoryTitle>{props.title}</CategoryTitle>
      ) : (
        <Link href={`/category/${props.id}`}>
          <a>
            <CategoryTitle>{props.title}</CategoryTitle>
          </a>
        </Link>
      )}
    </Container>
  );
}
