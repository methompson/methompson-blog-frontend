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

import {
  FirebasePersistenceError,
  FirebaseLoginError,
} from '@/src/errors/firebase_errors';
import { getAuthToken } from '@/src/shared/auth_functions';
import { getBaseDomain } from '@/src/shared/get_base_url';

const COOKIE_NAME = 'idToken';

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
    const auth = getAuth();

    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      const msg = `${e}`;
      // console.error('setPersistence error', msg);
      throw new FirebasePersistenceError(msg);
    }

    try {
      // cred = await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password);
      await signInWithEmailAndPassword(
        auth,
        loginRequest.email,
        loginRequest.password,
      );
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

const logOut = createAsyncThunk('auth/logOut', async () => {
  signOut(getAuth());
});

const setLogin = createAsyncThunk('auth/setLogin', async (_, thunkAPI) => {
  const token = await getAuthToken();
  thunkAPI.dispatch(authSlice.actions.setUserData());
  const cookie = `${COOKIE_NAME}=${token}; SameSite=Strict; domain=${getBaseDomain()}`;
  document.cookie = cookie;
});

const setLogout = createAsyncThunk('auth/setLogout', async (_, thunkAPI) => {
  thunkAPI.dispatch(authSlice.actions.unsetUserData());
  document.cookie = `${COOKIE_NAME}=; SameSite=Strict; expires=${new Date(
    0,
  ).toUTCString()}`;
});

const authActions = {
  logIn,
  logOut,
  setLogin,
  setLogout,
};

export { authActions, authSlice };
