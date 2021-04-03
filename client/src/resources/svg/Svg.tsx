export interface SvgProps {
  viewBox?: string;
  fill?: string;
  width?: string;
  height?: string;
}

interface Props extends SvgProps {
  name: string;
}

export function Svg(props: Props) {
  const DynamicSvg = require(`./${props.name}`)[props.name];

  return <DynamicSvg {...props}></DynamicSvg>;
}

Svg.defaultProps = {
  viewBox: '0 0 24 24',
  fill: 'black',
  width: '24px',
  height: '24px'
};
