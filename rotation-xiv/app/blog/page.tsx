import { BlogList } from './list';

export default function Blog() {
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-center mb-8">Blog</h1>
      <BlogList />
    </div>
  );
}
