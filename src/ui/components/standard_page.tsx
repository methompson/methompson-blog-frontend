import React from 'react';

import Header from '@src/ui/components/header';
import Footer from '@src/ui/components/footer';

interface StandardPageProps {
  children: React.ReactNode;
}

export default function StandardPage(props: StandardPageProps) {
  return (
    <div className=''>
      <div className='pageContainer min-h-screen flex flex-col justify-between items-center'>
        <Header />
        <div className='contentContainer flex grow px-4'>
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}