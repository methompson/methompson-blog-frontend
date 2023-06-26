import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { actions, AppDispatch } from '@/src/store';
import { getFirebaseConfig } from '@/src/shared/get_firebase_config';
import { CenteredLoadingScreen } from './standard_page';

interface AuthenticationGuardProps {
  children: React.ReactNode;
}

export function AuthenticationHandler(props: AuthenticationGuardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const firebaseConfig = getFirebaseConfig();

    initializeApp(firebaseConfig);

    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      // const idTokenResult = await user?.getIdTokenResult();
      // console.log(idTokenResult?.token);

      // console.log('auth state changed');

      if (user === null) {
        dispatch(actions.setLogout());
      } else {
        dispatch(actions.setLogin());
      }

      setLoaded(true);
    });
  });

  if (!loaded) {
    return <CenteredLoadingScreen />;
  }

  return (<span>
    {props.children}
  </span>);
}