import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { trans, Lang } from 'src/resources/languages';

import { LOGOUT, LogoutQueryType } from 'src/query/user';
import { DropDownMenu } from '../common/box/DropDownMenu';

const AdminDropDown = styled.div({});

const MenuItem = styled.a((props) => {
  return {
    padding: '.5rem',
    borderRadius: '.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    wordBreak: 'keep-all',
    '&:hover': {
      backgroundColor: props.theme.hoverBackground
    }
  };
});

const RotateIcon = styled.span({
  display: 'inline-block',
  marginLeft: '.4rem'
});

interface Props {
  isLogin: boolean;
}

export function AdminMenu(props: Props) {
  const router = useRouter();

  const [logout] = useMutation<LogoutQueryType>(LOGOUT);

  async function handleLogout() {
    try {
      const { data } = await logout();

      if (!data) {
        alert('Try again...');
        return;
      }

      if (data.logout.isSuccess) {
        router.reload();
        return;
      } else {
        alert('Try again...');
        return;
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <AdminDropDown>
      <DropDownMenu
        mainButton={
          <>
            {trans(Lang.Menu)}
            <RotateIcon>
              <FontAwesomeIcon icon={faCaretDown} />
            </RotateIcon>
          </>
        }
        dropMenu={
          <>
            <Link href='/admin' passHref={true}>
              <MenuItem>{trans(Lang.Admin)}</MenuItem>
            </Link>
            {props.isLogin ? (
              <MenuItem onClick={handleLogout}>{trans(Lang.Logout)}</MenuItem>
            ) : (
              <Link href={{ pathname: '/admin/login', query: { url: router.asPath } }} passHref={true}>
                <MenuItem>{trans(Lang.Login)}</MenuItem>
              </Link>
            )}
          </>
        }
      />
    </AdminDropDown>
  );
}
