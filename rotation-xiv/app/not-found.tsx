import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col py-20 text-center">
      <h1 className="text-xl">404 | Page not Found</h1>
      <p>Could not find requested resource.</p>
      <Link href="/" className="my-1 text-sm">
        Return Home
      </Link>
    </div>
  );
}
