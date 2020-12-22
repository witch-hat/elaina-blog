import styled from 'styled-components';

import { theme } from 'src/styles';

interface Styles {
  margin?: string;
  width?: string;
}

interface BoxProps {
  styles?: Styles;
  isTransform: boolean;
}

const Box = styled.div<BoxProps>((props) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props.styles?.width || 'max-content',
    margin: props.styles?.margin || '10px',
    border: `1px solid ${theme.light.borderColor}`,
    borderRadius: '12px',
    transition: '.2s all',
    cursor: `${props.isTransform ? 'pointer' : 'default'}`,
    '&:hover': {
      transform: `${props.isTransform ? 'translateY(-10px)' : 'none'}`,
      boxShadow: `${props.isTransform ? '0 10px 4px -2px rgba(38, 38, 38, .2)' : 'none'}`
    }
  };
});

interface Props {
  children: JSX.Element;
  isTransform: boolean;
  styles?: Styles;
}

export function BorderBox(props: Props) {
  return (
    <Box isTransform={props.isTransform} styles={props.styles}>
      {props.children}
    </Box>
  );
}
