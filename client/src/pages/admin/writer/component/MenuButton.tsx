import styled from 'styled-components';
import { FormatBoldBlack } from 'src/resources/svg/FormatBoldBlack';

interface ContainerProps {}

const Container = styled.div<ContainerProps>((props: ContainerProps) => {
  return {
    display: 'flex',
    width: '26px',
    height: '26px'
  };
});

interface BorderProps {
  isActive: boolean;
}

const BorderContainer = styled.div<BorderProps>((props: BorderProps) => {
  return {
    display: 'flex',
    position: 'absolute',
    width: '26px',
    height: '26px',
    '&:hover': {
      border: '1px solid black'
    }
  };
});

interface Props {
  isActive: boolean;
  desc: string;
}

export function MenuButton(props: Props) {
  return (
    <Container>
      <BorderContainer isActive={props.isActive}>
        <FormatBoldBlack />
      </BorderContainer>
    </Container>
  );
}

MenuButton.defaultProps = {
  isActive: false
};
