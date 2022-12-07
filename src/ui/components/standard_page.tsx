import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { BlogHeader } from '@/src/ui/components/header';
import { BlogFooter } from '@/src/ui/components/footer';
import { selectors } from '@/src/store';
import { LoadingSpinner } from './loading_spinner';

interface StandardPageProps {
  children: React.ReactNode;
  authRestricted?: boolean;
}

function StandardPageLayout(props: StandardPageProps) {
  return (
    <div className='bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300'>
      <div className='pageContainer min-h-screen flex flex-col justify-between items-center'>
        <BlogHeader />

        <div className='contentContainer container flex flex-col grow items-stretch'>
          {props.children}
        </div>

        <BlogFooter />
      </div>
    </div>
  );
}

export function StandardPage(props: StandardPageProps) {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const isAuthLoaded = useSelector(selectors.isAuthLoaded);

  if (!isAuthLoaded) {
    return <StandardPageLayout><CenteredLoadingScreen /></StandardPageLayout>;
  }

  if (props.authRestricted === true && !isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return <StandardPageLayout>
    {props.children}
  </StandardPageLayout>;
}

export function CenteredStandardPage(props: StandardPageProps) {
  return <StandardPage authRestricted={props.authRestricted}>
    <div className='centeredPageContainer flex flex-col grow w-full lg:max-w-3xl px-4 lg:px-0'>
      {props.children}
    </div>
  </StandardPage>;
}

export function CenteredLoadingScreen() {
  return <div className='grow flex justify-center items-center'>
    <LoadingSpinner />
  </div>;
}