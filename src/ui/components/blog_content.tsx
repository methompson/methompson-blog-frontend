import React from 'react';
import { Link } from 'react-router-dom';

import { BlogPost } from '@/src/models/blog_post';

interface BlogCardInput {
  blogPost: BlogPost;
}

function BlogPostTitle(props: BlogCardInput) {
  return <h1 className='text-3xl font-black'>{props.blogPost.title}</h1>;
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

export function BlogContent(props: BlogCardInput) {
  return <span>
    <BlogPostTitle blogPost={props.blogPost} />

    <BlogPostDate blogPost={props.blogPost} />

    <div className='prose dark:prose-invert'>
      <div dangerouslySetInnerHTML={{ __html: props.blogPost.bodyInHtml }}></div>
    </div>
  </span>;
}

export function BlogContentShort(props: BlogCardInput) {
  return <span>
    <Link to={`/posts/${props.blogPost.slug}`}>
      <BlogPostTitle blogPost={props.blogPost} />
    </Link>

    <BlogPostDate blogPost={props.blogPost} />

    <div className='prose dark:prose-invert'>
      <div dangerouslySetInnerHTML={{ __html: props.blogPost.bodyInHtml }}></div>
    </div>
  </span>;
}

export function BlogCard(props: BlogCardInput) {
  return <figure className='flex rounded-xl p-8 shadow-lg'>
    <BlogContentShort blogPost={props.blogPost} />
  </figure>;
}