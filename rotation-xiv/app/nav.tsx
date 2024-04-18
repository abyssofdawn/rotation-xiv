"use client";
import { ThemeSwitch } from "./utils";

export function Navigation() {
  return (
    <div
      className="
      border-b-2 flex items-center gap-2
      bg-light-bg-5  border-light-fg
      dark:bg-dark-bg-1 dark:border-dark-fg

    "
    >
      <div className="p-2 shrink-0">
        <picture>
          <img alt="ToolsXIV" src="./favicon.ico" className="w-10 h-10" />
        </picture>
      </div>
      <div>
        <h1 className="text-2xl">Rotation Builder</h1>
      </div>
      <div className="grow" />
      <ThemeSwitch />
      <div></div>
    </div>
  );
}
