import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';

import { selectors, actions, AppDispatch } from '@/src/store';

export function HeaderLinks() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const _logOut = () => {
    dispatch(actions.logOut());
  };

  const children = [];

  children.push(<span className='headerMenuItem'><Link to='/'>Home</Link></span>);

  const debugLink = isLoggedIn
    ? <span className='headerMenuItem'><Link to='/debug'>Debug</Link></span>
    : null;

  children.push(debugLink);

  const addBlogPostLink = isLoggedIn
    ? <span className='headerMenuItem'><Link to='/new_post'>New Post</Link></span>
    : null;

  children.push(addBlogPostLink);

  const logInOutLink = isLoggedIn
    ? <Link to='/' onClick={_logOut}>Logout</Link>
    : <Link to='/login'>Login</Link>;

  children.push(<span className='headerMenuItem'>{logInOutLink}</span>);

  return (
    <span>
      <HeaderList>
        {children}
      </HeaderList>

      <HeaderMenuButton>
        {children}
      </HeaderMenuButton>
    </span>
  );
};

interface HeaderProps {
  children: React.ReactNode[];
}

function HeaderMenuButton(props: HeaderProps) {
  return (
    <span className='block sm:hidden h-8'>
      <button onClick={() => {
        console.log('click');
      }}>
        <MenuIcon className='h-8 w-8 messageIcon' />
      </button>

      <HeaderMenu>
        {props.children}
      </HeaderMenu>
    </span>
  );
}

function HeaderMenu(props: HeaderProps) {
  return <div className='absolute top-0 left-0 w-full h-full bg-red-500 flex flex-col items-end pr-8 pt-8'>
    {props.children}
  </div>;
}

function HeaderList(props: HeaderProps) {

  return <span className='hidden sm:block'>
    {props.children}
  </span>;
}