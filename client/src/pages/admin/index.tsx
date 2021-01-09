import React, { useState } from 'react';

import { LogIn } from './login';
import { AdminMainPage } from './component/AdminMainPage';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

export default function Admin() {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isLogIn, setIsLogIn] = useState(false);

  return isLogIn ? <AdminMainPage /> : <LogIn theme={theme} />;
}
