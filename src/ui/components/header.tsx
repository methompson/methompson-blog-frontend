import { HeaderLinks } from './header-links';

export function BlogHeader() {
  return (
    <header className='blogHeader w-full flex justify-center bg-red-600 text-red-100 dark:bg-red-900 dark:text-red-300'>
      <span className='container flex flex-row justify-between items-center px-4 py-8'>
        <h1 className='text-xl font-extrabold'>Mat&lsquo;s Blog</h1>
        <HeaderLinks />
      </span>
    </header>
  );
}