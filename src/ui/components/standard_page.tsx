import React from 'react';

import { BlogHeader } from '@src/ui/components/header';
import { BlogFooter } from '@src/ui/components/footer';

interface StandardPageProps {
  children: React.ReactNode;
}

export function StandardPage(props: StandardPageProps) {
  return (
    <div className='bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
      <div className='pageContainer min-h-screen flex flex-col justify-between items-center'>
        <BlogHeader />
        <div className='contentContainer container px-4 flex flex-col grow items-stretch'>
          {props.children}
        </div>
        <BlogFooter />
      </div>
    </div>
  );
}