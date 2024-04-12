
'use client'

import parse from 'html-react-parser'
import useSWR from 'swr';

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import { Button } from 'flowbite-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function ParsedDescription({description}: {description: string}) {
return(<>{
        parse(
        description
            //reformat weird artifacts in original data
            .replaceAll(" .", ".")  //some skills have a space before the period
            .replaceAll("<br />\n", "\n") //some skills have <br />\n instead of just \n
            .replaceAll("\n", "<br>") //turn all \n into actual line breaks (parse doesn't understand \n)
            .replaceAll("<br><br>", "<br>") //there are double spaces after a line, half each space
            //skill descriptions
            .replaceAll('<span style="color:#00cc22;">', '<span className="text-light-green dark:text-dark-faded-green">') //effect, matches game color style and remaps it to tailwind
            .replaceAll('<span style="color:#ffff66;">', '<span className="text-light-yellow dark:text-dark-faded-yellow">')    //status names
            .replaceAll('<span style="color:#ff7b1a;">', '<span className="text-light-orange dark:text-dark-faded-orange">')    //skill names
            //status descriptions
            .replaceAll('<UIForeground>F201F4</UIForeground><UIGlow>F201F5</UIGlow>', '<span className="text-light-orange dark:text-dark-faded-orange">')
            .replaceAll('<UIGlow>01</UIGlow><UIForeground>01</UIForeground>', '</span>')
        )
    }</>
    
)
}

export function class_names() {
    return [
        "gunbreaker",
        "warrior",
        "sage",
        "white mage",
        "dark knight",
        "paladin",
        "bard",
        "black mage",
        "dragoon",
        "red mage",
        "summoner",
        "reaper",
        "monk",
        "astrologian",
        "machinist",
        "dancer",
        "scholar",
        "samurai",
        "ninja"
    ]
}

export function skills_for_class(classjob: string) {
    const { data, error, isLoading } = useSWR('/api/classjob?job='+classjob, url => fetcher(url));

    return {
        skills: data,
        skillserror: error,
        skillsloading: isLoading,
    }
}


function toggle_dark_theme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
}
  
export function DarkThemeToggle() {
return (
    <button onClick={toggle_dark_theme}>dark mode</button>
)
}



export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  if (resolvedTheme === 'dark') {
    return (
    <Button outline pill onClick={() => setTheme('light')} className='outline-2 outline-black'>
        <FiSun className='stroke-dark-bg-5 fill-dark-bg-5 m-2' size={24}/>
    </Button>
    )
  }

  if (resolvedTheme === 'light') {
    return ( 
    <Button outline pill onClick={() => setTheme('dark')} className='border-2 border-light-grey-0'>
        <FiMoon className='stroke-light-grey-0 fill-light-grey-0 m-2' size={24}/>
    </Button>
    )
  }

}