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
  const timer = new Date(props.time);

  return (
    <Container>
      <LatestTime>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
        <p>{`${timer.getFullYear()}.${timer.getMonth() + 1}.${timer.getDate()} ${timer.getHours()}:${timer.getMinutes()}`}</p>
      </LatestTime>
      <PostCount>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
        <p>{props.count}</p>
      </PostCount>
    </Container>
  );
}
