import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';

import { selectors, actions, AppDispatch } from '@/src/store';

const commonColors = 'bg-red-600 dark:bg-red-900 text-red-100 dark:text-red-300';

export function BlogHeader() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(actions.logOut());
  };
  const children = [];

  children.push(<span className='headerMenuItem' key='header_home_link'><Link to='/'>Home</Link></span>);

  if (isLoggedIn) {
    // children.push(<span className='headerMenuItem' key='header_debug_link'><Link to='/debug'>Debug</Link></span>);
    children.push(<span className='headerMenuItem' key='header_new_post_link'><Link to='/new_post'>New Post</Link></span>);
  }

  const logInOutLink = isLoggedIn
    ? <Link to='/' onClick={logout}>Logout</Link>
    : <Link to='/login'>Login</Link>;

  children.push(<span className='headerMenuItem' key='log_in_or_out_link'>{logInOutLink}</span>);

  return (
    <header className='w-full'>
      <HeaderMenuButton>
        {children}
      </HeaderMenuButton>

      <BlogHeaderContainer className='hidden sm:flex'>
        <HeaderList>
          {children}
        </HeaderList>
      </BlogHeaderContainer>
    </header>
  );
}

interface BlogHeaderContainerProps {
  children: React.ReactNode;
  className?: string;
}

function BlogHeaderContainer(props: BlogHeaderContainerProps) {
  let classes = 'container flex flex-row justify-between items-center px-4 py-8 z-10 ' + (props.className ?? '');

  return (
    <span className={'blogHeader w-full flex justify-center ' + commonColors}>
      <span className={classes}>
        <h1 className='text-xl font-extrabold'>Mat&lsquo;s Blog</h1>
        {props.children}
      </span>
    </span>
  );
}

interface HeaderProps {
  children: React.ReactNode[];
}

function HeaderMenuButton(props: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (!menuOpen) {
        return;
      }
      const width = window.innerWidth;
      // console.log('width', width);

      if (width >= 640) {
        setMenuOpen(false);
      }
    });
  });

  const headerContent = (
    <BlogHeaderContainer className='flex sm:hidden' >
      <span className='block sm:hidden h-8'>
        <button onClick={() => {
          setMenuOpen(!menuOpen);
        }}>
          <MenuIcon className='h-8 w-8 messageIcon' />
        </button>
      </span>
    </BlogHeaderContainer>
  );

  const containerHeight = menuOpen ? 'h-full' : 'h-0';
  const styles = 'menuVeil animatedBackground w-full fixed top-0 left-0 z-0 overflow-hidden';

  return (
    <span className='flex sm:hidden'>
      {headerContent}
      <span className={`${styles} ${containerHeight} ${commonColors}`}>
        {headerContent}
        <HeaderMenu>
          {props.children}
        </HeaderMenu>
      </span>
    </span>
  );
}

// The menu that shows the links in mobile mode
function HeaderMenu(props: HeaderProps) {
  // positioning and alignment
  let classes = 'flex flex-col items-end';
  // colors and style
  classes += ' font-bold text-3xl ' + commonColors;
  // padding
  classes += ' pr-8 pt-8';

  return <div className={'headerMenu ' + classes}>
    {props.children}
  </div>;
}

// Displays links horizontally on larger screens
function HeaderList(props: HeaderProps) {
  return <span className='hidden sm:block'>
    {props.children}
  </span>;
}