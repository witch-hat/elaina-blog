import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { DropDownMenu } from 'src/components';
import { Lang, trans } from 'src/resources/languages';

const MenuButton = styled.p<{ danger?: boolean }>((props) => ({
  display: 'block',
  padding: '.5rem',
  borderRadius: '.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  wordBreak: 'keep-all',
  color: props.danger ? '#dd0000' : 'inherit',
  '&:hover': {
    backgroundColor: '#ddd'
  }
}));

interface Props {
  isLogin: boolean;
  isCommentFromAdmin: boolean;
  onAdminEditClick: () => void;
  onUserEditClick: () => void;
  onDeleteMenuClick: () => void;
}

export function CommentMenu(props: Props) {
  return (
    <DropDownMenu
      mainButton={<FontAwesomeIcon icon={faEllipsisV} />}
      dropMenu={
        <>
          {/* admin인경우: 자기것만 edit, 나머지는 edit 버튼 X, admin 아닌경우 edit 버튼 O */}
          {props.isLogin ? (
            props.isCommentFromAdmin && <MenuButton onClick={() => props.onAdminEditClick()}>{trans(Lang.Edit)}</MenuButton>
          ) : (
            <MenuButton onClick={() => props.onUserEditClick()}>{trans(Lang.Edit)}</MenuButton>
          )}
          <MenuButton danger onClick={() => props.onDeleteMenuClick()}>
            {trans(Lang.Delete)}
          </MenuButton>
        </>
      }
    />
  );
}
