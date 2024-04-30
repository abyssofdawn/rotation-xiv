// app/page.tsx
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';

function PostCard(post: Post) {
  return (
    <Link
      href={post.url}
      className="text-light-dim-blue dark:text-dark-dim-blue text-center"
    >
      <div className="mb-8 border-2 rounded-md skillshadow p-2 hover:bg-light-bg-3 dark:hover:bg-dark-bg-1">
        <h2 className="text-xl ">{post.title}</h2>
        <time dateTime={post.date} className=" block text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
