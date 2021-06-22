import styled from 'styled-components';

export interface Style {
  readonly width?: string;
  readonly height?: string;
  readonly borderRadius?: string;
  readonly boxShadow?: string;
  readonly backgroundColor?: string;
  readonly border?: string;
  readonly objectFit?: 'inherit' | 'none' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'fill' | 'contain' | 'cover' | 'scale-down';
  readonly medium?: {
    readonly width?: string;
    readonly height?: string;
  };
  readonly small?: {
    readonly width?: string;
    readonly height?: string;
    readonly objectFit?: 'inherit' | 'none' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'fill' | 'contain' | 'cover' | 'scale-down';
  };
}

const Image = styled.img<Style>((props: Style) => {
  return {
    display: 'block',
    width: props.width || '100px',
    height: props.height || '100px',
    border: props.border || 'none',
    borderRadius: props.borderRadius || '8px',
    backgroundColor: props.backgroundColor || 'transparent',
    boxShadow: props.boxShadow || 'none',
    objectFit: props.objectFit || 'fill',
    '@media screen and (max-width: 1380px)': {
      width: props.medium?.width || props.width || '100px',
      height: props.medium?.height || props.height || '100px'
    },
    '@media screen and (max-width: 767px)': {
      objectFit: props.small?.objectFit || props.objectFit || 'fill',
      width: props.small?.width || props.width || '100px',
      height: props.small?.height || props.height || '100px'
    }
  };
});

interface Props {
  src: string | undefined;
  alt: string;
  styles?: Style;
}

export function RoundImage(props: Props) {
  if (props.src) {
    return <Image {...props.styles} src={props.src} alt={props.alt} />;
  } else {
    return null;
  }
}
