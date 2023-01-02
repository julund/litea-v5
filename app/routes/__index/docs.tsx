import { Outlet, useMatches } from "@remix-run/react";
import { NavLink as RemixNavLink } from "@remix-run/react";
import { type ReactNode } from "react";
import { IconChevronDown, IconChevronUp } from "~/components/icons";
import Container from "~/layout/shared/container";

export const handle = { title: "Documentation" };

export const Link = ({ children, to }: { children: ReactNode; to: string; }) => {
    return (
        <RemixNavLink to={to} prefetch="intent" className={({ isActive }) => isActive ? "text-base-600 hover:text-primary-500" : "text-primary-600 hover:text-primary-500"}>
            {children}
        </RemixNavLink>
    );
};

const NavItem = ({ children, heading, open = false }: { children: React.ReactNode; heading: string; open?: boolean }) => (
    <details open={open} className="flex rounded-sm open:bg-base-50 bg-base-50/60 px-4 text-base-700 group transition-all duration-500 min-w-[300px]">
        <summary className="py-2 select-none cursor-pointer flex gap-2 justify-center items-center">
            <span className="font-semibold grow capitalize">{heading}</span>
            <span className="text-lg hidden group-open:inline opacity-80"><IconChevronUp/></span>
            <span className="text-lg inline group-open:hidden opacity-80"><IconChevronDown/></span>
        </summary>
        <div className="flex flex-col gap-2 p-2 mb-4">
            {children}
        </div>
    </details>
);

export default function DocsPage() {

    const matches = useMatches();
    const m = matches.map(match => ({ title: match.handle?.title, url: match.pathname })); // todo: take in use

    return (
        <Container>
            <h1>Documentation</h1>
            <p className="py-4">
                {JSON.stringify(m)}
            </p>
            <div className="flex gap-2">
                <nav className="flex flex-col bg-base-100 rounded-sm">
                    <NavItem heading="Getting started" open>
                        <Link to="/docs/introduction">Introduction</Link>
                        <Link to="/docs/create-an-account">Create an account</Link>
                        <Link to="/docs/log-in-to-dashboard">Log in to the dashboard</Link>
                        <Link to="/docs/adding-your-site">Adding your site</Link>
                        <Link to="/docs/adding-the-script-to-your-site">Adding the script to your site</Link>
                        <Link to="/docs/initial-setup-and-configuration">Initial setup and configuration</Link>
                        <Link to="/docs/verify-that-everything-works">Verify that everything works</Link>
                    </NavItem>
                    <NavItem heading="Managing your sites">
                        <Link to="/docs/">Adding a site</Link>
                        <Link to="/docs/">Site configuration</Link>
                        <Link to="/docs/">Disabling/enabling sites</Link>
                        <Link to="/docs/">Deleting sites</Link>
                    </NavItem>
                    <NavItem heading="Statistics dashboard">
                        <Link to="/docs/">Adding a site</Link>
                        <Link to="/docs/">Site configuration</Link>
                        <Link to="/docs/">Disabling/enabling sites</Link>
                        <Link to="/docs/">Deleting sites</Link>
                    </NavItem>
                    <NavItem heading="Advanced configuration">
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                    </NavItem>
                    <NavItem heading="Account settings">
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                    </NavItem>
                    <NavItem heading="Billing and subscription">
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                        <Link to="/docs/">Item X</Link>
                    </NavItem>
                </nav>
                <div className="p-2 bg-base-100 rounded-sm grow">
                    <Outlet />
                </div>
            </div>
        </Container>
    );
};