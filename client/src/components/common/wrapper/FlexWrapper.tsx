import styled from 'styled-components';

interface DivProps {
  readonly display?: 'flex' | 'inline-flex';
  readonly flexDirection?:
    | 'inherit'
    | '-moz-initial'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'column'
    | 'column-reverse'
    | 'row'
    | 'row-reverse'
    | undefined;
  readonly justifyContent?: string;
  readonly alignItems?: string;
  readonly width?: string;
  readonly margin?: string;
  readonly padding?: string;
  readonly medium?: {
    readonly flexDirection?:
      | 'inherit'
      | '-moz-initial'
      | 'initial'
      | 'revert'
      | 'unset'
      | 'column'
      | 'column-reverse'
      | 'row'
      | 'row-reverse'
      | undefined;
    readonly width?: string;
    readonly justifyContent?: string;
    readonly alignItems?: string;
    readonly padding?: string;
  };
  readonly small?: {
    readonly flexDirection?:
      | 'inherit'
      | '-moz-initial'
      | 'initial'
      | 'revert'
      | 'unset'
      | 'column'
      | 'column-reverse'
      | 'row'
      | 'row-reverse'
      | undefined;
    readonly width?: string;
    readonly alignItems?: string;
    readonly justifyContent?: string;
    readonly margin?: string;
    readonly padding?: string;
  };
}

const FlexDiv = styled.div<DivProps>((props: DivProps) => {
  return {
    display: props.display || 'flex',
    flexDirection: props.flexDirection || 'row',
    justifyContent: props.justifyContent || 'center',
    alignItems: props.alignItems || 'center',
    width: props.width || 'auto',
    margin: props.margin || '0',
    padding: props.padding || '0',
    '@media screen and (max-width: 1380px)': {
      flexDirection: props.medium?.flexDirection || props.flexDirection || 'row',
      width: props.medium?.width || props.width || 'auto',
      justifyContent: props.medium?.justifyContent || props.justifyContent || 'center',
      alignItems: props.medium?.alignItems || props.alignItems || 'center',
      padding: props.medium?.padding || props.padding || '0px'
    },
    '@media screen and (max-width: 768px)': {
      flexDirection: props.small?.flexDirection || props.flexDirection || 'row',
      width: props.small?.width || props.width || 'auto',
      alignItems: props.small?.alignItems || props.alignItems || 'center',
      justifyContent: props.small?.justifyContent || props.justifyContent || 'center',
      margin: props.small?.margin || props.margin || '0',
      padding: props.small?.padding || props.padding || '0px'
    }
  };
});

interface Props {
  children: JSX.Element | JSX.Element[] | null | null[] | (JSX.Element | null)[] | string;
  styles?: DivProps;
}

export function FlexWrapper(props: Props) {
  return <FlexDiv {...props.styles}>{props.children}</FlexDiv>;
}
