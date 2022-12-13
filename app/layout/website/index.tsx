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

const WebsiteLayout = ({ children, session }: { children: ReactNode; session?: ISession | null }) => {
    return (
        <Root>
            <Header>
                <Nav>
                    <SiteNavLink to="/features">Features</SiteNavLink>
                    <SiteNavLink to="/pricing">Pricing</SiteNavLink>
                    <DropDown title="Resources" config={{ toggleClassName: "flex gap-1 items-center px-4 py-2 text-xl font-medium transition-all duration-300 font-title focus:text-base-800 focus-hover:text-base-600 text-base-600 hover:text-primary-600" }}>
                        <span className="flex flex-col gap-2 p-2">
                            <Link to="/blog" className="flex flex-col opacity-90 hover:opacity-100">
                                <span className="font-title font-medium text-lg text-base-800">Our blog</span>
                                <span className="text-sm text-base-600">Read our latest news & articles related to analytics</span>
                            </Link>
                            <Link to="/documentation" className="flex flex-col opacity-90 hover:opacity-100">
                                <span className="font-title font-medium text-lg text-base-800">Documentation</span>
                                <span className="text-sm text-base-600">Learn how to use Litea analytics</span>
                            </Link>
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
        </Root>
    );
};

export default WebsiteLayout;