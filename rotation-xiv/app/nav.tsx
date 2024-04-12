'use client'

import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle} from "flowbite-react";
import { ThemeSwitch } from "./utils";

export function Navigation() {
  return (
    <div className='p-2 sticky top-0 bg-light-bg-4 dark:bg-dark-bg-1 border-b-2 border-light-grey-0 dark:border-dark-bg-5'>
        <Navbar fluid rounded className='relative'>
            <Navbar.Brand>
                <img src="/favicon.ico" className="mr-1 h-6 sm:h-9" alt="Flowbite React Logo" />
                <h1 className="self-center whitespace-nowrap text-xl font-semibold">Rotation Builder</h1>
            </Navbar.Brand>
            <div className="absolute right-0">
                <ThemeSwitch />
            </div>
            <Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}