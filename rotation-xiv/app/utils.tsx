'use client';
import parse from 'html-react-parser';
import useSWR from 'swr';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from "next/image";
import { useSwitch } from '@mui/base';
import { styled } from '@mui/system';
import clsx from 'clsx';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export type Skill = { ID: number, Name: string, IconHD: string, Description: string, ActionCategory: {ID: number} }
export type TSkill = { 
  skill: number,              //the skill's id, so i don't pass kilobytes per skill
  delay: number               //the delay on the skill, used to offset and check "clipping"
}

export type Timeline = {
  skills: {
    gcd: TSkill,              //the gcd
    slots?: TSkill[],         //all ogcds
    start: number,            //start time
    end: number               //end time = max of recast, sum of animation lock and skill delay
  }[]
}

export function parse_description(description: string) {
  return description
  //reformat weird artifacts in original data
    .replaceAll("※", "\n\n※")
    .replaceAll(" .", ".")  //some skills have a space before the period
    .replaceAll("<br />\n", "\n") //some skills have <br />\n instead of just \n
    .replaceAll("\n", "<br>") //turn all \n into actual line breaks (parse doesn't understand \n)
    .replaceAll("<br><br>", "<br>") //there are double spaces after a line, half each space
    //skill descriptions
    .replaceAll('<span style="color:#00cc22;">', '<br><span className="text-light-green dark:text-dark-faded-green">') //effect, matches game color style and remaps it to tailwind
    .replaceAll('<span style="color:#ffff66;">', '<span className="text-light-yellow dark:text-dark-faded-yellow">')    //status names
    .replaceAll('<span style="color:#ff7b1a;">', '<span className="text-light-orange dark:text-dark-faded-orange">')    //skill names
    .replaceAll("<br><br>", "<br>") //there are double spaces after a line, half each space
    //status descriptions
    .replaceAll('<UIForeground>F201F4</UIForeground><UIGlow>F201F5</UIGlow>', '<span className="text-light-orange dark:text-dark-faded-orange">')
    .replaceAll('<UIGlow>01</UIGlow><UIForeground>01</UIForeground>', '</span>')
}

export function ParsedDescription({description}: {description: string}) {
  console.log(description)
return(<>{
        parse(
          description
              //reformat weird artifacts in original data
              .replaceAll("※", "\n\n※")
              .replaceAll(" .", ".")  //some skills have a space before the period
              .replaceAll("<br />\n", "\n") //some skills have <br />\n instead of just \n
              .replaceAll("\n", "<br>") //turn all \n into actual line breaks (parse doesn't understand \n)
              .replaceAll("<br><br>", "<br>") //there are double spaces after a line, half each space
              //skill descriptions
              .replaceAll('<span style="color:#00cc22;">', '<br><span className="text-light-green dark:text-dark-faded-green">') //effect, matches game color style and remaps it to tailwind
              .replaceAll('<span style="color:#ffff66;">', '<span className="text-light-yellow dark:text-dark-faded-yellow">')    //status names
              .replaceAll('<span style="color:#ff7b1a;">', '<span className="text-light-orange dark:text-dark-faded-orange">')    //skill names
              .replaceAll("<br><br>", "<br>") //there are double spaces after a line, half each space
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

export function useSkillsForClass(classjob: string | null) {
    const { data, error, isLoading } = useSWR('/api/classjob?job='+classjob, url => fetcher(url));
    
    return {
        skills: data,
        skillserror: error,
        skillsloading: isLoading,
    }
}


export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])


  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={24}
      height={24}
      sizes="24x24"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )


  const toggle_dark_theme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  } 

  return (
    <MUISwitch onChange={toggle_dark_theme} checked={resolvedTheme==='dark'}/>
  );

}

function MUISwitch(props: any) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <span className={clsx(stateClasses, "relative inline-block h-5 w-8 shrink-0")}>
      <span className='rounded-xl block bg-light-grey-1 dark:bg-dark-faded-green w-full h-full'>
        <SwitchThumb className={clsx(stateClasses, "absolute block bg-light-fg")} />
      </span>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" className='w-full h-full'/>
    </span>
  );
}

const SwitchInput = styled('input')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')`
  width: 18px;
  height: 18px;
  top: 1px;
  left: 1px;
  border-radius: 10px;

  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;

    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' fill='rgba(211,198,170,1)'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z'%3E%3C/path%3E%3C/svg%3E")
      center center no-repeat;
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(12px);

    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' fill='rgba(211,198,170,1)'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M10 6C10 10.4183 13.5817 14 18 14C19.4386 14 20.7885 13.6203 21.9549 12.9556C21.4738 18.0302 17.2005 22 12 22C6.47715 22 2 17.5228 2 12C2 6.79948 5.9698 2.52616 11.0444 2.04507C10.3797 3.21152 10 4.56142 10 6ZM4 12C4 16.4183 7.58172 20 12 20C14.9654 20 17.5757 18.3788 18.9571 15.9546C18.6407 15.9848 18.3214 16 18 16C12.4772 16 8 11.5228 8 6C8 5.67863 8.01524 5.35933 8.04536 5.04293C5.62119 6.42426 4 9.03458 4 12ZM18.1642 2.29104L19 2.5V3.5L18.1642 3.70896C17.4476 3.8881 16.8881 4.4476 16.709 5.16417L16.5 6H15.5L15.291 5.16417C15.1119 4.4476 14.5524 3.8881 13.8358 3.70896L13 3.5V2.5L13.8358 2.29104C14.5524 2.1119 15.1119 1.5524 15.291 0.835829L15.5 0H16.5L16.709 0.835829C16.8881 1.5524 17.4476 2.1119 18.1642 2.29104ZM23.1642 7.29104L24 7.5V8.5L23.1642 8.70896C22.4476 8.8881 21.8881 9.4476 21.709 10.1642L21.5 11H20.5L20.291 10.1642C20.1119 9.4476 19.5524 8.8881 18.8358 8.70896L18 8.5V7.5L18.8358 7.29104C19.5524 7.1119 20.1119 6.5524 20.291 5.83583L20.5 5H21.5L21.709 5.83583C21.8881 6.5524 22.4476 7.1119 23.1642 7.29104Z'%3E%3C/path%3E%3C/svg%3E");
    }
  }
`;