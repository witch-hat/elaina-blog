import styled from 'styled-components';

interface Styles {
  width?: string;
  border?: string;
  padding?: string;
  flexDirection?: 'column' | 'row';
  alignItems?: string;
  justifyContent?: string;
}

const FlexContainer = styled.div<Styles>((props) => {
  return {
    display: 'flex',
    justifyContent: props.justifyContent || 'center',
    height: `calc(90vh - 40px - ${props.padding || '0px'})`,
    flexDirection: props.flexDirection || 'row',
    alignItems: props.alignItems || 'center',
    width: props.width || '100%',
    border: props.border || 'none',
    padding: props.padding || '0'
  };
});

interface Props {
  styles?: Styles;
  children: JSX.Element | JSX.Element[];
}

export function Container(props: Props) {
  return <FlexContainer {...props.styles}>{props.children}</FlexContainer>;
}
