import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { DropDownMenu } from 'src/components';
import { trans, Lang } from 'src/resources/languages';

import { MemoizedAboutInfo } from './AboutInfo';

const FlexWrapper = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Button = styled.button((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  textAlign: 'center',
  wordBreak: 'keep-all',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  }
}));

interface Props {
  name: string;
  updatedAt: number;
  isLogin: boolean;
}

export function AboutMenu(props: Props) {
  const router = useRouter();

  return (
    <FlexWrapper>
      <MemoizedAboutInfo name={props.name} updatedAt={props.updatedAt} />
      {props.isLogin && (
        <DropDownMenu
          mainButton={<FontAwesomeIcon icon={faEllipsisV} />}
          dropMenu={
            <Button onClick={() => router.replace(router.asPath + '&edit=true', undefined, { shallow: true })}>{trans(Lang.Edit)}</Button>
          }
        />
      )}
    </FlexWrapper>
  );
}
