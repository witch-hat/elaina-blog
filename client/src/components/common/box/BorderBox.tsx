import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

interface Styles {
  margin?: string;
  width?: string;
}

interface BoxProps {
  styles?: Styles;
  isTransform: boolean;
  themeMode: ThemeMode;
}

const Box = styled.div<BoxProps>((props) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props.styles?.width || 'max-content',
    margin: props.styles?.margin || '10px',
    border: `1px solid ${theme[props.themeMode].borderColor}`,
    borderRadius: '.5rem',
    transition: '.2s all',
    cursor: `${props.isTransform ? 'pointer' : 'default'}`,
    '&:hover': {
      transform: `${props.isTransform ? 'translateY(-10px)' : 'none'}`,
      boxShadow: `${props.isTransform ? `0 10px 4px -2px ${theme[props.themeMode].shadowColor}` : 'none'}`
    }
  };
});

interface Props {
  children: JSX.Element;
  isTransform: boolean;
  styles?: Styles;
}

export function BorderBox(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Box isTransform={props.isTransform} styles={props.styles} themeMode={themeMode}>
      {props.children}
    </Box>
  );
}
