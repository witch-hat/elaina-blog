import { NextPageContext } from 'next';

export async function isAuth(context: NextPageContext) {
  const response = await fetch('http://localhost:4000/is_auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      cookie: context.req?.headers.cookie || ''
    }
  });

  const { isAuth } = await response.json();
  const isAdmin = isAuth;

  return { isAdmin, response };
}
