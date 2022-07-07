import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { actions, AppDispatch } from '@src/store';
import { BlogPostCollection } from '@src/models/blog_collection';
import { CenteredStandardPage } from '@src/ui/components/standard_page';
import { ShortBlogCard } from '@/src/ui/components/blog_content';

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

export function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const [blogPosts, setBlogPosts] = useState(new BlogPostCollection({}));
  const [morePages, setMorePages] = useState(false);

  const pageStr = useParams().page ?? '1';
  const page = getPage(pageStr);

  console.log(pageStr, page);

  useEffect(() => {
    (async function getBlogPosts() {
      try {
        const result = dispatch(actions.getBlogList({ page }));
        // const payload = result.payload;
        const payload = await result.unwrap();

        const blogCollection = BlogPostCollection.fromJSON(payload.posts);
        setBlogPosts(blogCollection);
        setMorePages(payload.morePages);
      } catch (e) {
        dispatch(actions.addErrorMessage({
          message: `Error Receiving Blog Posts: ${e}`,
        }));
      }
    })();
  }, [dispatch, page]);

  const blogComponents = blogPosts.sortedList.map((bp) => <ShortBlogCard key={bp.id} blogPost={bp} />);

  return (
    <CenteredStandardPage>
      {blogComponents}
      <PageMovementBlock pageNumber={page} morePages={morePages}/>
    </CenteredStandardPage>
  );
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