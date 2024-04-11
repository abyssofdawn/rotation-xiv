import parse from 'html-react-parser'
import useSWR from 'swr';

const fetcher = (url: string, init: {}) => fetch(url, init).then(res => res.json());

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
        "sage"
    ]
}

export function skills_for_class(classjob: string) {
    const { data, error, isLoading } = useSWR(['/api/classjob/', {body: classjob}], ([url, init]) => fetcher(url, init));

    return {
        skills: data,
        skillserror: error,
        skillsloading: isLoading,
    }
}