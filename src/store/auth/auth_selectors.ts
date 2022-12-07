import { StateType } from '@/src/store';

function isLoggedIn(state: StateType) {
  return state.auth.loggedIn;
}

function isAuthLoaded(state: StateType) {
  return state.auth.authLoaded;
}

export {
  isLoggedIn,
  isAuthLoaded,
};