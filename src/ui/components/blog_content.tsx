import React from 'react';

import { BlogPost } from '@/src/models/blog_post';
import { Link } from 'react-router-dom';

interface BlogCardInput {
  blogPost: BlogPost;
}

function BlogPostTitle(props: BlogCardInput) {
  return <h1 className='text-3xl font-black'>{props.blogPost.title}</h1>;
}

function BlogPostDate(props: BlogCardInput) {
  return <span className='text-slate-400 dark:text-slate-500'>{props.blogPost.dateAdded.toISOString()}</span>;
}

export function BlogContent(props: BlogCardInput) {
  return <span>
    <BlogPostTitle blogPost={props.blogPost} />

    <BlogPostDate blogPost={props.blogPost} />

    <p className='prose dark:prose-invert'>{props.blogPost.body}</p>
  </span>;
}

export function BlogContentShort(props: BlogCardInput) {
  return <span>
    <Link to={`/posts/${props.blogPost.slug}`}>
      <BlogPostTitle blogPost={props.blogPost} />
    </Link>

    <BlogPostDate blogPost={props.blogPost} />

    <p className='prose dark:prose-invert'>{props.blogPost.body}</p>
  </span>;
}

export function BlogCard(props: BlogCardInput) {
  return <figure className='md:flex rounded-xl p-8 shadow-lg'>
    <BlogContentShort blogPost={props.blogPost} />
  </figure>;
}