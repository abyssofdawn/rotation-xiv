'use client';
import Link from 'next/link';
import { ThemeSwitch } from './utils';

export function Navigation() {
  return (
    <div
      className="
      border-b-2 flex items-center gap-2
      bg-slate-300  border-slate-600
      dark:bg-slate-800 dark:border-slate-100
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
