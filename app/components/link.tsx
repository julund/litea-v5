import { Link as RemixLink, NavLink as RemixNavLink, useLocation, type LinkProps, type NavLinkProps } from "@remix-run/react";
import { type ReactNode } from "react";
import { IconExternalLink } from "./icons";
import { classNames } from "~/utils/helpers";

export const Link = ({ children, ...props }: { children: ReactNode; } & LinkProps) => {
    if (!props.to) return <span className={props.className}>{children}</span>;
    return (
        <RemixLink {...props}>
            {children}
        </RemixLink>
    );
};

export const NavLink = ({ children, ...props }: { children: ReactNode } & NavLinkProps) => {

    const activeClassName = "text-base-500 bg-base-200 ";
    const inactiveClassName = "text-base-600 hover:bg-base-200";
    return (
        <RemixNavLink {...props} prefetch="intent" className={({ isActive }) => classNames("flex items-center gap-2 px-4 py-2 w-full text-lg font-medium font-title rounded-sm transition-all duration-500", isActive ? activeClassName : inactiveClassName)}>
            {children}
        </RemixNavLink>
    );
};

// Custom because NavLink fn won't be correct on index page
export const IndexNavLink = ({ children, ...props }: { children: ReactNode } & NavLinkProps) => {

    const activeClassName = "text-base-500 bg-base-200 ";
    const inactiveClassName = "text-base-600 hover:bg-base-200";

    const location = useLocation();
    const isActive = props.to === location.pathname;

    return (
        <RemixNavLink {...props} prefetch="intent" className={(classNames("flex items-center gap-2 px-4 py-2 w-full text-lg font-medium font-title rounded-sm transition-all duration-500", isActive ? activeClassName : inactiveClassName))}>
            {children}
        </RemixNavLink>
    );
};

export const SiteNavLink = ({ children, ...props }: { children: ReactNode } & NavLinkProps) => {

    return (
        <RemixNavLink {...props} prefetch="intent" className={({ isActive }) => classNames(
            "px-4 py-2 text-xl font-medium transition-all duration-300 font-title",
            isActive ? "text-base-800 hover:text-base-600" : "text-base-600 hover:text-primary-600")}
        >
            {children}
        </RemixNavLink>
    );
};

export const ExternalLink = ({ to, children, ...props }: { to: string; children: ReactNode } & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    const classes = classNames(props.className, "inline-flex gap-1 items-center hover:text-primary-600");
    return (
        <a {...props} href={`https://${to}`} className={classes} rel="noreferrer" target="_blank">
            {children}<IconExternalLink size={14} />
        </a>
    );
};