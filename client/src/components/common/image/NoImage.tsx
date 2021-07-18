import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
}

export function NoImage(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      id='Layer_1'
      x='0px'
      y='0px'
      width={`${props.width}px`}
      height={`${props.height}px`}
      viewBox='89.437 -10.563 621.127 621.127'
      enable-background='new 89.437 -10.563 621.127 621.127'
      xmlSpace='preserve'
    >
      <rect
        x='109.437'
        y='10'
        fill='#DADBDC'
        width={`${props.width - 0.07 * props.width}`}
        height={`${props.height - 0.07 * props.height}`}
      />
      <g transform='translate(-5.000000, -5.000000)'>
        <path
          fill='#F3F4F4'
          d='M94.437-5.563h621.127v621.127H94.437V-5.563L94.437-5.563z M475.346,254.057l-8.185-47.831L299.63,235.641    l24.553,139.908l16.627-2.813v12.021h170.087V254.057H475.346L475.346,254.057z M340.811,358.666l-5.371,1.021l-19.95-112.794    l140.419-24.812l5.628,31.974H340.811V358.666L340.811,358.666L340.811,358.666z M497.087,370.943H354.621V267.868h142.466V370.943    L497.087,370.943z M363.828,277.075v76.474l28.903-19.181l17.903,11.252l43.48-47.829l5.629,2.301l28.134,32.485v-55.502H363.828    L363.828,277.075L363.828,277.075z M391.451,310.068c-6.648,0-12.276-5.626-12.276-12.277c0-6.65,5.628-12.279,12.276-12.279    c6.651,0,12.276,5.626,12.276,12.279C403.729,304.442,398.102,310.068,391.451,310.068L391.451,310.068L391.451,310.068z'
        />
      </g>
    </svg>
  );
}
