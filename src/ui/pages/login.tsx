import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isString } from 'markdown-it/lib/common/utils';

import { actions, AppDispatch, selectors } from '@/src/store';

import { StandardPage } from '@/src/ui/components/standard_page';
import { TextInput } from '@/src/ui/components/new_post/text_input';
import { FullWidthButton, RegularButton } from '@/src/ui/components/regular_button';
import { isRecord } from '@/src/shared/type_guards';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  async function logUserIn() {
    try {
      await dispatch(actions.logIn({email, password})).unwrap();
      // If We get here, we've successfully signed in.
      navigate('/');
    } catch(e) {
      let msg: string;
      if (isRecord(e) && isString(e['message'])) {
        msg = e.message;
      } else {
        msg = `${e}`;
      }

      // If We get here, we've had an issue and we should notify the user.
      dispatch(actions.addErrorMessage({
        message: msg,
      }));
    }

  };

  const commonClasses = 'flex flex-col w-full';
  const divClasses = ' pb-4';

  // allows us to use enter to submit without reloading the page
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <StandardPage>
      <div className='flex justify-center items-center grow'>
        <figure className={commonClasses + ' rounded-xl p-8 m-8 sm:m-0 shadow-lg w-full sm:w-96'}>
          <form onSubmit={onSubmit} >
            <h1 className='text-2xl font-extrabold pb-2'>Log In</h1>
            <div className={commonClasses + divClasses}>
              <TextInput
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={commonClasses + divClasses}>
              <TextInput
                value={password}
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <FullWidthButton
              text='Log In'
              action={logUserIn} />
          </form>
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