import styled from 'styled-components';

import { color } from 'resources/colors';

interface Styles {
  borderColor?: string;
  margin?: string;
}

const Box = styled.div<Styles>((props) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    margin: props.margin || '10px',
    border: `1px solid ${props.borderColor || color.borderColor}`,
    borderRadius: '12px',
    transition: '.2s all',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 10px 4px -2px rgba(38, 38, 38, .2)'
    }
  };
});

interface Props {
  styles?: Styles;
  children: JSX.Element;
}

export function BorderBox(props: Props) {
  return <Box {...props.styles}>{props.children}</Box>;
}
