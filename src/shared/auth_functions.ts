import { getAuth } from 'firebase/auth';

import { FirebaseLoginError } from '@/src/errors/firebase_errors';

async function getUserId(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user === null) {
    return null;
  }

  return user.uid;
}

async function getAuthToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user === null) {
    throw new FirebaseLoginError('No user logged in');
  }

  const token = await user.getIdToken();

  return token;
}

export {
  getAuthToken,
  getUserId,
};