import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  marginTop: '.4rem',
  color: '#666',
  fontSize: '.8rem',
  display: 'flex'
});

const LatestTime = styled.span({
  display: 'flex',
  marginRight: '.8rem',
  alignItems: 'center'
});

const PostCount = styled.span({
  display: 'flex',
  alignItems: 'center'
});

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
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
        <p>{`${now.getFullYear()}.${month}.${now.getDate()}`}</p>
      </LatestTime>
      <PostCount>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
        <p>{props.count}</p>
      </PostCount>
    </Container>
  );
}
