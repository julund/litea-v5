import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "../shared/nav";
import { IconDashboard } from "~/components/icons";
import { Link, SiteNavLink } from "~/components/link";
import { Message } from "~/components/message";

const WebsiteLayout = ({ children, session }: { children: ReactNode; session?: ISession | null }) => {
    return (
        <Root>
            <Header>
                <Nav>
                    <SiteNavLink to="/features" className="nav-link">Features</SiteNavLink>
                    <SiteNavLink to="/pricing" className="nav-link">Pricing</SiteNavLink>
                    <SiteNavLink to="/docs" className="nav-link">Docs</SiteNavLink>
                    {session?.data ?
                        <Link to="/dashboard" className="button button-ghost"><IconDashboard className="text-base-400" />Dashboard</Link> :
                        <>
                            <Link to="/start" className="button button-primary">Get started</Link>
                            <Link to="/login" className="button button-base-light">Log in</Link>
                        </>
                    }
                </Nav>
                {/* <Message message={{ type: "info", text: "Message on WebsiteLayout." }} /> */}
                <Message message={session?.message} duration={5000} />
            </Header>
            <Main>
                {children}
            </Main>
        </Root>
    );
};

export default WebsiteLayout;