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

import { FirebasePersistenceError, FirebaseLoginError } from '@/src/errors/firebase_errors';

interface AuthState {
  loggedIn: boolean;
  authLoaded: boolean;
}

const initialStoreState: AuthState = {
  loggedIn: false,
  authLoaded: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStoreState,
  reducers: {
    setUserData(state) {
      // saveUserData(state, action: PayloadAction <AuthPayload> ) {
      state.loggedIn = true;
      state.authLoaded = true;
    },
    unsetUserData(state) {
      state.loggedIn = false;
      state.authLoaded = true;
    },
  },
});

interface LoginRequest {
  email: string;
  password: string;
}

const logIn = createAsyncThunk(
  'auth/login',
  async (loginRequest: LoginRequest) => {
    console.log('logging in');

    const auth = getAuth();

    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      const msg = `${e}`;
      console.error('setPersistence error', msg);
      throw new FirebasePersistenceError(msg);
    }

    try {
      console.log('Signing in with email and password');
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

      console.error('sigin in error', msg);

      throw new FirebaseLoginError(msg);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logOut',
  async () => {
    signOut(getAuth());
  },
);

const setLogin = createAsyncThunk(
  'auth/setLogin',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(authSlice.actions.setUserData());
  },
);

const setLogout = createAsyncThunk(
  'auth/setLogout',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(authSlice.actions.unsetUserData());
  },
);

const authActions = {
  logIn,
  logOut,
  setLogin,
  setLogout,
};

export {
  authActions,
  authSlice,
};