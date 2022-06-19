import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { actions, AppDispatch } from '@src/store';
import { getFirebaseConfig } from '@/src/shared/get_firebase_config';

export function AuthenticationHandler() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const firebaseConfig = getFirebaseConfig();

    initializeApp(firebaseConfig);

    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      // const idTokenResult = await user?.getIdTokenResult();
      // console.log(idTokenResult?.token);

      if (user === null) {
        dispatch(actions.setLogout());
      } else {
        dispatch(actions.setLogin());
      }
    });
  });

  return (<span></span>);
}