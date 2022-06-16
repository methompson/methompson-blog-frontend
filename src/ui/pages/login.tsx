import React, { useState } from 'react';

import { StandardPage } from '@src/ui/components/standard_page';
import { TextInput } from '@src/ui/components/new_post/text_input';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const commonClasses = 'flex flex-col w-full';
  const divClasses = ' pb-4';

  const logUserIn = () => {
    console.log('Log In');
  };

  return (
    <StandardPage>
      <div className='flex justify-center items-center grow'>
        <figure className={commonClasses + ' rounded-xl p-8 shadow-lg md:w-1/2'}>
          <div className={commonClasses + divClasses}>
            <TextInput
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className={commonClasses + divClasses}>
            <TextInput
              value={password}
              placeholder='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button
            className='self-start bg-red-500 hover:bg-red-700 text-white rounded-md p-2'
            onClick={logUserIn}>
            Log In
          </button>
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