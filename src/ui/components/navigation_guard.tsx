import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import { actions, AppDispatch, selectors } from '@/src/store';

interface AuthenticationGuardProps {
  children: React.ReactNode;
}

export function AuthenticationGuard(props: AuthenticationGuardProps) {
  const isLoggedIn = useSelector(selectors.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return <span>
    {props.children}
  </span>;
}