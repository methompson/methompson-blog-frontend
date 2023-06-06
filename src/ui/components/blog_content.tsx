import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BlogPost } from '@/src/models/blog_post';
import { Card } from '@/src/ui/components/card';
import { RegularButton } from './regular_button';
import { BlogStatus } from '@/src/models/blog_post';

interface BlogCardInput {
  blogPost: BlogPost;
  showUpdateButton?: boolean;
}

function BlogPostTitle(props: BlogCardInput) {
  const title = props.blogPost.status === BlogStatus.Posted
    ? props.blogPost.title
    : `Draft: ${props.blogPost.title}`;
  return <h1 className='text-3xl font-black'>{title}</h1>;
}

function getDay(date: Date): string {
  switch (date.getDay()) {
    case(0):
      return 'Sunday';
    case(1):
      return 'Monday';
    case(2):
      return 'Tuesday';
    case(3):
      return 'Wednesday';
    case(4):
      return 'Thursday';
    case(5):
      return 'Friday';
    case(6):
    default:
      return 'Saturday';
  }
}

function getMonth(date: Date): string {
  switch(date.getMonth()) {
    case(0):
      return 'January';
    case(1):
      return 'February';
    case(2):
      return 'March';
    case(3):
      return 'April';
    case(4):
      return 'May';
    case(5):
      return 'June';
    case(6):
      return 'July';
    case(7):
      return 'August';
    case(8):
      return 'September';
    case(9):
      return 'October';
    case(10):
      return 'November';
    case(11):
    default:
      return 'December';
  }
}

function getNumberSuffix(date: number): string {
  const dateStr = `${date}`.padStart(2, '0');
  const lastTwoDigits = dateStr.substring(dateStr.length - 2);

  const secondToLastDigit = lastTwoDigits.substring(0, 1);
  const lastDigit = lastTwoDigits.substring(1);

  if (secondToLastDigit !== '1') {
    if (lastDigit === '1') {
      return 'st';
    } else if (lastDigit === '2') {
      return 'nd';
    } else if (lastDigit === '3') {
      return 'rd';
    }
  }

  return 'th';
}

function BlogPostDate(props: BlogCardInput) {
  const dateAdded = props.blogPost.dateAdded;
  const year = dateAdded.getFullYear();
  const month = getMonth(dateAdded);
  const date = dateAdded.getDate();
  const dateSuffix = getNumberSuffix(date);

  const day = getDay(dateAdded);

  return <span className='text-slate-400 dark:text-slate-500'>
    {`${day}, ${month} ${date}${dateSuffix}, ${year}`}
  </span>;
}

function UpdatePostButton(props: { action: (() => Promise<void>) | (() => void) }) {
  return <RegularButton
    action={props.action}
    text="Update" />;
}

export function BlogContent(props: BlogCardInput) {
  const navigate = useNavigate();

  let updateButton = null;
  if (props.showUpdateButton) {
    updateButton = <UpdatePostButton action={() => {
      navigate(`/update/${props.blogPost.slug}`);
    }} />;
  }

  return (
    <span>
      {updateButton}

      <BlogPostTitle blogPost={props.blogPost} />

      <BlogPostDate blogPost={props.blogPost} />

      <div className='prose dark:prose-invert'>
        <div dangerouslySetInnerHTML={{ __html: props.blogPost.bodyInHtml }}></div>
      </div>
    </span>
  );
}

export function BlogContentShort(props: BlogCardInput) {
  const link = `/post/${props.blogPost.slug}`;

  return (
    <span>
      <Link className='underline' to={link}>
        <BlogPostTitle blogPost={props.blogPost} />
      </Link>

      <BlogPostDate blogPost={props.blogPost} />

      <div className='prose blogContentShort dark:prose-invert'>
        <div dangerouslySetInnerHTML={{ __html: props.blogPost.bodyInHtml }}></div>
      </div>

      <Link className='text-blue-600 font-bold underline' to={link}>
        Read More
      </Link>
    </span>
  );
}

export function ShortBlogCard(props: BlogCardInput) {
  return <Card>
    <BlogContentShort blogPost={props.blogPost} />
  </Card>;
}