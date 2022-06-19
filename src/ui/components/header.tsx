import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors, actions, AppDispatch } from '@/src/store';

export function BlogHeader() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const _logOut = () => {
    dispatch(actions.logOut());
  };

  const logInOutLink = isLoggedIn
    ? <Link to='/' onClick={_logOut}>Logout</Link>
    : <Link to='/login'>Login</Link>;

  const debugLink = isLoggedIn
    ? <span className='headerMenuItem'><Link to='/debug'>Debug</Link></span>
    : null;

  const addBlogPostLink = isLoggedIn
    ? <span className='headerMenuItem'><Link to='/new_post'>New Post</Link></span>
    : null;

  return <header className='blogHeader container py-8'>

    <span className='flex flex-row justify-between px-4'>
      <h1>Mat&lsquo;s Blog</h1>
      <span>
        <span className='headerMenuItem'><Link to='/'>Home</Link></span>
        {debugLink}
        {addBlogPostLink}
        <span className='headerMenuItem'>{logInOutLink}</span>
      </span>
    </span>
  </header>;
}