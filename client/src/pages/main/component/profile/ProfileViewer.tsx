import styled, { keyframes, css } from 'styled-components';

import { ProfileType } from 'src/query/profile';

import { MemoizedProfileImageViewer } from './view/ProfileImageViewer';
import { MemoizedProfileTextViewer } from './view/ProfileTextViewer';
import { ButtonContainer } from './view/ButtonContainer';

interface Props {
  profile: ProfileType;
  isLogin: boolean;
  enterEditMode: () => void;
}

export function ProfileViewer(props: Props) {
  return (
    <>
      <MemoizedProfileImageViewer image={props.profile.image || ''} />
      <MemoizedProfileTextViewer profile={props.profile} />
      {props.isLogin && <ButtonContainer enterEditMode={props.enterEditMode} />}
    </>
  );
}
