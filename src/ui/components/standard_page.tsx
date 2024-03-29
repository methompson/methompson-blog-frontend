import React from 'react';
import { useSelector } from 'react-redux';

import { BlogHeader } from '@/src/ui/components/header';
import { BlogFooter } from '@/src/ui/components/footer';
import { selectors } from '@/src/store';
import { LoadingSpinner } from './loading_spinner';

interface StandardPageProps {
  children: React.ReactNode;
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
  const isAuthLoaded = useSelector(selectors.isAuthLoaded);

  if (!isAuthLoaded) {
    return <CenteredLoadingScreen />;
  }

  return <StandardPageLayout>
    {props.children}
  </StandardPageLayout>;
}

export function CenteredStandardPage(props: StandardPageProps) {
  return <StandardPage>
    <div className='centeredPageContainer flex flex-col grow w-full lg:max-w-3xl px-4 lg:px-0'>
      {props.children}
    </div>
  </StandardPage>;
}

export function CenteredLoadingScreen() {
  return <StandardPageLayout>
    <div className='grow flex justify-center items-center'>
      <LoadingSpinner />
    </div>
  </StandardPageLayout>;
}