import styled from 'styled-components';

import { FormatBoldBlack } from 'src/resources/svg/FormatBoldBlack';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

interface ContainerProps {
  isActive: boolean;
  themeMode: ThemeMode;
}

const Toggle = styled.div({
  width: 'max-content',
  borderRadius: '4px',
  position: 'absolute',
  flexShrink: 0,
  top: '2.1rem',
  padding: '.2rem',
  left: '0',
  backgroundColor: 'rgba(0,0,0,.8)',
  color: '#f1f2f3',
  display: 'none'
});

const Container = styled.div<ContainerProps>((props: ContainerProps) => {
  return {
    display: 'flex',
    width: '2rem',
    height: '2rem',
    margin: '.2rem',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    border: '1px solid transparent',
    borderRadius: '4px',
    cursor: props.isActive ? 'pointer' : 'not-allowed',
    '&:hover': {
      border: props.isActive ? `1px solid ${theme[props.themeMode].hoverBorderColor}` : '1px solid transparent'
    },
    [`&:hover ${Toggle}`]: {
      display: 'block'
    }
  };
});

interface Props {
  isActive: boolean;
  desc: string;
  children: JSX.Element;
  onClick: Function;
}

export function MenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container onClick={() => props.onClick()} isActive={props.isActive} themeMode={themeMode}>
      {props.children}
      <Toggle>
        <p>{props.desc}</p>
      </Toggle>
    </Container>
  );
}

MenuButton.defaultProps = {
  isActive: false
};
