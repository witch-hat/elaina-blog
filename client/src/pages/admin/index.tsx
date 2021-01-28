import React, { useState } from 'react';

import LogIn from './login';
import { AdminPageLayout } from './component/AdminPageLayout';

export default function Admin() {
  const [isLogIn, setIsLogIn] = useState(false);

  return isLogIn ? (
    <AdminPageLayout>
      <div>메인입니다.</div>
    </AdminPageLayout>
  ) : (
    <LogIn setLogin={setIsLogIn} />
  );
}
