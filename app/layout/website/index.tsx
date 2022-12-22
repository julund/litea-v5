import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "../shared/nav";
import { IconDashboard } from "~/components/icons";
import { Link, SiteNavLink } from "~/components/link";
import { Message } from "~/components/message";
import DropDown from "~/components/dropDown";
import Footer from "../shared/footer";
import CTA from "./cta";
import { getYear } from "date-fns";

const DescriptiveLink = ({ to, title, description }: { to: string, title: string, description: string }) => {
    return (
        <Link to={to} className="flex flex-col opacity-90 hover:opacity-100 group">
            <span className="font-title font-medium text-lg group-hover:text-primary-700 text-base-800">{title}</span>
            <span className="text-sm group-hover:text-primary-700 text-base-600">{description}</span>
        </Link>
    );
};

const WebsiteLayout = ({ children, session }: { children: ReactNode; session?: ISession | null }) => {
    return (
        <Root>
            <Header>
                <Nav>
                    <SiteNavLink to="/features">Features</SiteNavLink>
                    <SiteNavLink to="/pricing">Pricing</SiteNavLink>
                    <DropDown title="Resources" config={{ toggleClassName: "flex gap-1 items-center px-4 py-2 text-xl font-medium transition-all duration-300 font-title focus:text-base-800 focus-hover:text-base-600 text-base-600 hover:text-primary-600" }}>
                        <span className="flex flex-col gap-2 p-2">
                            <DescriptiveLink to="/blog" title="Our blog" description="Read our latest news & articles related to analytics" />
                            <DescriptiveLink to="/documentation" title="Documentation" description="Learn how to use Litea analytics" />
                        </span>
                    </DropDown>
                    {session?.data ?
                        <Link to="/dashboard" className="button button-ghost"><IconDashboard className="text-base-400" />Dashboard</Link> :
                        <>
                            <Link to="/start" className="button button-primary">Get started</Link>
                            <Link to="/login" className="button button-base-light">Log in</Link>
                        </>
                    }
                </Nav>
                <Message message={session?.message} duration={5000} />
            </Header>
            <Main>
                {children}
            </Main>
            <CTA/>
            <Footer>
                <div className="mx-auto px-6 max-w-4xl">
                    <p className="text-sm py-1 text-gray-600">Copyright © 2021 - {getYear(Date.now())} Litea. All rights reserved.</p>
                    <p className="text-xs py-1 text-gray-500">— Effortlessly track website performance with Litea - the lightweight, privacy-first analytics solution</p>
                </div>
            </Footer>
        </Root>
    );
};

export default WebsiteLayout;