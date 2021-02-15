import { createContext, useContext, useEffect, useState } from 'react';

interface Context {
  authState: AuthState;
  login: Function;
  logout: Function;
  setToken: Function;
}

const initialValue: Context = {
  authState: { token: undefined, userId: undefined },
  login: () => {},
  setToken: () => {},
  logout: () => {}
};

const AuthContext = createContext<Context>(initialValue);

interface Props {
  children: JSX.Element;
}

interface AuthState {
  token?: string;
  userId?: string;
}

function AuthProvider(props: Props) {
  const initialState = {
    token: undefined,
    userId: undefined
  };
  const [authState, setAuthState] = useState<AuthState>(initialState);

  function login(userId: string, token: string) {
    setAuthState({
      ...authState,
      userId,
      token
    });
  }

  function setToken(token: string) {
    setAuthState({
      ...authState,
      token
    });
  }

  function logout() {}

  useEffect(() => {
    if (localStorage.getItem('userId') !== authState.userId) {
      setAuthState({
        ...authState,
        userId: localStorage.getItem('userId') || undefined
      });
    }
  }, [authState]);

  return <AuthContext.Provider value={{ authState, login, setToken, logout }}>{props.children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
