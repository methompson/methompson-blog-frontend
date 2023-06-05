import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { actions, AppDispatch, selectors } from '@/src/store';
import { BlogPostCollection } from '@/src/models/blog_collection';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { ShortBlogCard } from '@/src/ui/components/blog_content';
import { messengerInstance } from '@/src/shared/messenger';

function getPage(input: string): number {
  const parsedPage = parseInt(input, 10);
  if (Number.isNaN(parsedPage)) {
    return 1;
  }

  if (parsedPage <= 0) {
    return 1;
  }

  return parsedPage;
}

interface PageMovementBlockInput {
  pageNumber: number
  morePages: boolean
}

function PageMovementBlock(props: PageMovementBlockInput) {
  return (
    <div className='flex flex-row justify-between items-end grow my-4'>
      <span>
        <PrevPageBlock pageNumber={props.pageNumber}/>
      </span>
      <span>
        <NextPageBlock pageNumber={props.pageNumber} morePages={props.morePages}/>
      </span>
    </div>
  );
}

interface PreviousPageBlockInput {
  pageNumber: number
}

function PrevPageBlock(props: PreviousPageBlockInput) {
  let content = null;
  if (props.pageNumber > 1) {
    let linkUrl;

    if (props.pageNumber === 2) {
      linkUrl = '/';
    } else {
      const newNumber = props.pageNumber - 1;
      linkUrl = `/posts/${newNumber}`;
    }

    content = <NavigationLink linkUrl={linkUrl} displayTitle='Previous Page' />;
    // content = <Link className='underline' to={linkUrl}>Previous Page</Link>;
  }

  return (<span>{content}</span>);
}

interface NextPageBlockInput {
  pageNumber: number
  morePages: boolean
}

function NextPageBlock(props: NextPageBlockInput) {
  let content = null;

  if (props.morePages) {
    const newNumber = props.pageNumber + 1;
    const linkUrl = `/posts/${newNumber}`;

    content = <NavigationLink linkUrl={linkUrl} displayTitle='Next Page' />;
    // content = <Link className='underline' to={linkUrl}>Next Page</Link>;
  }

  return (<span>{content}</span>);
}

interface NavigationLinkProps {
  linkUrl: string;
  displayTitle: string;
}

function NavigationLink(props: NavigationLinkProps) {
  return <Link className='underline font-bold' to={props.linkUrl}>{props.displayTitle}</Link>;
}

function NoPostsBlock() {
  return <h1
    className='text-2xl font-bold text-center'>
    No Blog Posts Yet. Check Back Soon!
  </h1>;
}

export function Home() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);

  const dispatch = useDispatch<AppDispatch>();

  const [blogPosts, setBlogPosts] = useState(new BlogPostCollection({}));
  const [morePages, setMorePages] = useState(false);

  const pageStr = useParams().page ?? '1';
  const page = getPage(pageStr);

  useEffect(() => {
    (async function getBlogPosts() {
      try {
        const action = isLoggedIn
          ? actions.getFullBlogList
          : actions.getBlogList;

        const result = dispatch(action({ page }));
        // const payload = result.payload;
        const payload = await result.unwrap();

        const blogCollection = BlogPostCollection.fromJSON(payload.posts);
        setBlogPosts(blogCollection);
        setMorePages(payload.morePages);
      } catch (e) {
        // console.log('error receiving blog posts', e);
        messengerInstance.addErrorMessage({
          message: `Error Receiving Blog Posts: ${e}`,
        });
      }
    })();
  }, [dispatch, isLoggedIn, page]);

  const blogComponents = blogPosts.sortedList.map((bp) => <ShortBlogCard key={bp.id} blogPost={bp} />);

  const output = blogComponents.length > 0 ? blogComponents : <NoPostsBlock />;

  return (
    <CenteredStandardPage>
      {output}
      <PageMovementBlock pageNumber={page} morePages={morePages}/>
    </CenteredStandardPage>
  );
}