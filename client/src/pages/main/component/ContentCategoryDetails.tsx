import styled from 'styled-components';

const Container = styled.div({
  marginTop: '.4rem',
  color: '#666',
  fontSize: '.8rem'
});

const LatestTime = styled.span({
  marginRight: '.8rem'
});

const PostCount = styled.span({});

interface Props {
  time: string;
  count: number;
}

export default function ContentCategoryDetails(props: Props) {
  const now = new Date();
  const month = now.getMonth() < 12 ? now.getMonth() + 1 : 1;

  return (
    <Container>
      <LatestTime>
        <i className='far fa-clock'></i>&nbsp;
        {`${now.getFullYear()}.${month}.${now.getDate()}`}
      </LatestTime>
      <PostCount>
        <i className='fas fa-book'></i>&nbsp;{props.count}
      </PostCount>
    </Container>
  );
}
