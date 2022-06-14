import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  // UserCredential,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

import { isString } from '@/src/shared/type_guards';
import { FirebasePersistenceError, FirebaseLoginError } from '@/src/errors/firebase_errors';

interface LoginRequest {
  email: string;
  password: string;
}

const login = createAsyncThunk(
  'auth/login',
  async (loginRequest: LoginRequest) => {
    const auth = getAuth();

    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      const msg = `${e}`;
      throw new FirebasePersistenceError(msg);
    }

    try {
      // cred = await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password);
      await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password);
    } catch (e) {
      let msg: string;

      if (e instanceof FirebaseError) {
        // const code = e.code;

        // switch(code) {
        //   case 'auth/invalid-email':
        //     break;
        //   case 'auth/user-disabled':
        //     break;
        //   case 'auth/user-not-found':
        //     break;
        //   case 'auth/wrong-password':
        //     break;
        //   default:
        // }

        msg = 'Invalid Username or Password';
      } else {
        msg = `${e}`;
      }

      throw new FirebaseLoginError(msg);
    }
  },
);

const logout = createAsyncThunk(
  'auth/logOut',
  async () => {
    signOut(getAuth());
  },
);

const setLogin = createAsyncThunk(
  'auth/setLogin',
  async () => {},
);

const setLogout = createAsyncThunk(
  'auth/setLogout',
  async () => {},
);

const authActions = {
  login,
  logout,
  setLogin,
  setLogout,
};

export {
  authActions,
};