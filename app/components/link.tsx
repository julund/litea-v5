import { Link as RemixLink, NavLink as RemixNavLink, type LinkProps, type NavLinkProps} from "@remix-run/react"
import { type ReactNode } from "react";
import { IconExternalLink } from "./icons";

export const Link = ({ children, ...props }: { children: ReactNode } & LinkProps) => {

    return (
        <RemixLink {...props}>
            { children }
        </RemixLink>
    );
};

export const NavLink = ({ children, ...props }: { children: ReactNode } & NavLinkProps) => {

    const activeClassName = "px-4 py-2 text-xl text-base-500 bg-base-200 font-title rounded-sm transition-all duration-500";
    const inactiveClassName = "px-4 py-2 text-xl text-base-600 hover:bg-base-200 font-title rounded-sm transition-all duration-500";
    return (
        <RemixNavLink {...props} prefetch="intent" className={({ isActive }) => isActive ? activeClassName : inactiveClassName }>
            { children }
        </RemixNavLink>
    );
};

export const SiteNavLink = ({ children, ...props }: { children: ReactNode } & NavLinkProps) => {

    const activeClassName = "px-4 py-2 text-xl font-medium transition-all duration-300 font-title text-base-800 hover:text-base-600";
    const inactiveClassName = "px-4 py-2 text-xl font-medium transition-all duration-300 font-title text-base-600 hover:text-primary-600";
    return (
        <RemixNavLink {...props} prefetch="intent" className={({ isActive }) => isActive ? activeClassName : inactiveClassName }>
            { children }
        </RemixNavLink>
    );
};

export const ExternalLink = ({ to, children, ...props } : { to: string; children: ReactNode } & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    return (
      <a  {...props} href={`https://${to}`} className="inline-flex gap-1 items-center hover:text-primary-600" rel="noreferrer" target="_blank">
        {children}<IconExternalLink size={14} />
      </a>
    );
  };