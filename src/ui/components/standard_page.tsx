import React from 'react';

import Header from '@src/ui/components/header';
import Footer from '@src/ui/components/footer';

interface StandardPageProps {
  children: React.ReactNode;
}

export default function StandardPage(props: StandardPageProps) {
  return (
    <div className='bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
      <div className='pageContainer min-h-screen flex flex-col justify-between items-center'>
        <Header />
        <div className='contentContainer container px-4 flex flex-col grow items-stretch'>
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}