import Link from 'next/link';
import { BlogList } from './blog/list';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto flex flex-col w-full gap-y-4">
      <div className="w-full">
        <h1 className="text-center text-4xl flex-1 text-light-aqua dark:text-dark-faded-aqua my-2">
          trance of thought
        </h1>
        <hr />
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        <h2>Tools</h2>
        <Link href={'/timeline'} className="h-fit w-fit">
          <button className="buttonoutlined text-md border-2">
            <h2 className="text-base">Rotation Tool</h2>
          </button>
        </Link>
        <hr />
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <h2>Blog</h2>
        <BlogList />
      </div>
    </div>
  );
}
