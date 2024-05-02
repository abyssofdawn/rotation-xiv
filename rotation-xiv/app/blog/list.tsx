'use client';
import { Post, allPosts } from '@/.contentlayer/generated';
import { compareAsc, format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const POSTS_PER_PAGE = 6;
const NAV_PAGES_WIDE = 2;

/*
this'll be like this

first page button always,

show up to NAV_PAGES_WIDE pages on either side of the current page number



last page button always
for 2 pages wide, page 4:
| << | < | 2 | 3 | 4 | 5 | 6 | > | >> |


*/

function Pages({
  page,
  setPage,
}: {
  page: number;
  setPage: (n: number) => void;
}) {
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(
    Math.min(
      Math.ceil(allPosts.length / POSTS_PER_PAGE),
      page + NAV_PAGES_WIDE,
    ),
  );

  useEffect(() => {}, [page]);

  return (
    <div className="flex justify-end rounded-md w-fit place-self-end divide-x-2 hborder">
      <button
        className="p-0 hbutton"
        disabled={page == 1}
        onClick={() => setPage(page - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
        </svg>
      </button>
      <button
        className="p-0 hbutton"
        disabled={page == lastIdx}
        onClick={() => setPage(page + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="m13.172 12-4.95-4.95 1.414-1.413L16 12l-6.364 6.364-1.414-1.415 4.95-4.95Z" />
        </svg>
      </button>
    </div>
  );
}

export function BlogList() {
  const [page, setPage] = useState(1);
  const posts = allPosts.sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date)),
  );

  const postsForPage = (page: number) => {
    return posts.slice(
      (page - 1) * POSTS_PER_PAGE,
      Math.min(page * POSTS_PER_PAGE, posts.length),
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {postsForPage(page).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      <Pages
        page={page}
        setPage={(p) => {
          setPage(p);
        }}
      />
    </>
  );
}

function PostCard(post: Post) {
  return (
    <Link href={post.url}>
      <div className="border-2 rounded-md skillshadow p-2 hover:bg-light-bg-3 dark:hover:bg-dark-bg-1">
        <h2 className="text-xl text-light-aqua dark:text-dark-faded-aqua text-center">
          {post.title}
        </h2>
        <div className="px-2">
          <time
            dateTime={post.date}
            className="block text-xs text-light-grey-0 dark:text-dark-grey-0"
          >
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <div className="m-0">{post.blurb}</div>
        </div>
      </div>
    </Link>
  );
}
