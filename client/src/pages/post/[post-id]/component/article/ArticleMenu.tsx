import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { DropDownMenu } from 'src/components';
import { trans, Lang } from 'src/resources/languages';
import { ProfileType } from 'src/query/profile';

import ArticleInfo from './ArticleInfo';

const Menu = styled.div({
  display: 'flex',
  width: '100%',
  height: '2.2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '.875rem'
});

const MenuButton = styled.p<{ danger?: boolean }>((props) => ({
  display: 'block',
  padding: '.5rem',
  borderRadius: '.5rem',
  textAlign: 'center',
  wordBreak: 'keep-all',
  color: props.danger ? '#dd0000' : 'inherit',
  '&:hover': {
    backgroundColor: '#ddd'
  }
}));

interface Props {
  isLogin: boolean;
  time: Date;
  profile: ProfileType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export function ContentMenu(props: Props) {
  return (
    <Menu>
      <ArticleInfo profile={props.profile} time={props.time} />
      {props.isLogin && (
        <DropDownMenu
          mainButton={<FontAwesomeIcon icon={faEllipsisV} />}
          dropMenu={
            <>
              <MenuButton>
                <Link href={`/post/${props.id}/edit`}>{trans(Lang.Edit)}</Link>
              </MenuButton>
              <MenuButton danger onClick={() => props.setIsModalOpen(true)}>
                {trans(Lang.Delete)}
              </MenuButton>
            </>
          }
        />
      )}
    </Menu>
  );
}
