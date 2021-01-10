import React, { useState } from 'react';

import LogIn from './login';
import { AdminMainPage } from './component/AdminMainPage';

export default function Admin() {
  const [isLogIn, setIsLogIn] = useState(false);

  return isLogIn ? <AdminMainPage /> : <LogIn />;
}
