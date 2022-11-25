import { NavLink } from "@remix-run/react";
import { useMatches } from "@remix-run/react";
import { IconChevronRight } from "./icons";

export default function Breadcrumbs({current} : {current?: string | null}) {

    const matches = useMatches();
    const titles = matches.filter((match) => match.handle && match.handle.title); // skip routes that don't have a title

    return (
        <div className="flex py-2 text-base-600 grow">
            {titles.map((match, index) => (
                index !== titles.length - 1 ? 
                <NavLink key={index} to={match.pathname} end className="flex items-center opacity-90">{match.handle?.title}<IconChevronRight className="opacity-50" /></NavLink> :
                <span key={index} className="opacity-75">{current ?? match.handle?.title}</span>
            ))}
        </div>
    );
}