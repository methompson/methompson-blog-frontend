import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors, actions, AppDispatch } from '@/src/store';
import { commonColors } from '@/src/ui/components/header';

function MenuChildren(): React.ReactNode[] {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(actions.logOut());
  };
  const children = [];

  children.push(<span className='headerMenuItem' key='header_home_link'><Link to='/'>Home</Link></span>);
  children.push(<span className='headerMenuItem' key='header_budget_link'><Link to='/budget'>Budget</Link></span>);

  if (isLoggedIn) {
    children.push(<span className='headerMenuItem' key='header_debug_link'><Link to='/debug'>Debug</Link></span>);
    children.push(<span className='headerMenuItem' key='header_new_post_link'><Link to='/new_post'>New Post</Link></span>);
    children.push(<span className='headerMenuItem' key='header_upload_image_link'><Link to='/upload_image'>Upload An Image</Link></span>);
    children.push(<span className='headerMenuItem' key='header_files_link'><Link to='/files'>Files</Link></span>);
  }

  const logInOutLink = isLoggedIn
    ? <Link to='/' onClick={logout}>Logout</Link>
    : <Link to='/login'>Login</Link>;

  children.push(<span className='headerMenuItem' key='log_in_or_out_link'>{logInOutLink}</span>);

  return children;
}

// Displays links horizontally on larger screens
export function LargeScreenMenuList() {
  return <span className='hidden sm:block'>
    { MenuChildren() }
  </span>;
}

export function SmallScreenMenuList() {
  // positioning and alignment
  let classes = 'flex flex-col items-end';
  // colors and style
  classes += ' font-bold text-3xl ' + commonColors;
  // padding
  classes += ' pr-8 pt-8';

  return <div className={'headerMenu ' + classes}>
    { MenuChildren() }
  </div>;
}