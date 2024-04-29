'use client';
import Link from 'next/link';
import { ThemeSwitch } from './utils';

export function Navigation() {
  return (
    <div
      className="
      border-b-2 flex items-center gap-2
      bg-light-bg-5  border-light-fg
      dark:bg-dark-bg-1 dark:border-dark-fg
      px-5
      py-1
    "
    >
      <Link href="/">
        <h1 className="text-2xl">trance of thought</h1>
      </Link>
      <div className="grow" />
      <ThemeSwitch />
      <div></div>
    </div>
  );
}
