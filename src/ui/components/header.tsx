import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogHeader() {
  return <header className='blogHeader container py-8'>
    <span className='flex flex-row justify-between px-4'>
      <h1>Mat&lsquo;s Blog</h1>
      <span>
        <span className='headerMenuItem'><Link to='/'>Home</Link></span>
        <span className='headerMenuItem'><Link to='/login'>Login</Link></span>
      </span>
    </span>
  </header>;
}