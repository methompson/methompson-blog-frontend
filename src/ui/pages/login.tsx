import React from 'react';

import { StandardPage } from '@src/ui/components/standard_page';
import { TextInput } from '@src/ui/components/new_post/text_input';

export function LoginPage() {
  return (
    <StandardPage>
      <div className='flex justify-center items-center grow'>
        <figure className='flex flex-col rounded-xl p-8 shadow-lg md:w-1/2 w-full'>
          <TextInput
            value=''
            placeholder='Username'
            onChange={() => {}} />
          <TextInput
            value=''
            placeholder='Password'
            onChange={() => {}} />
        </figure>
      </div>
    </StandardPage>
  );
}

function LoginInput() {
  return (
    <input type='text' />
  );
}