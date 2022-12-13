import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "../shared/nav";
import { Message } from "~/components/message";
import { IconSettings, IconLogout, IconDashboard } from "~/components/icons";
import { IndexNavLink, NavLink } from "~/components/link";
import DropDown from "~/components/dropDown";

const DashboardLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <Header className="bg-white">
                <Nav>
                    <DropDown title={session?.data?.handle}>
                        <IndexNavLink to="/dashboard"><IconDashboard size={22} />Dashboard</IndexNavLink>
                        <NavLink to="/dashboard/account"><IconSettings size={22} />Account</NavLink>
                        <NavLink to="/logout"><IconLogout />Log out</NavLink>
                    </DropDown>
                </Nav>
                {/* <Message message={{ type: "info", text: "Message on DashboardLayout." }} /> */}
                <Message message={session?.message} duration={5000} />
            </Header>
            <Main>
                {children}
            </Main>
        </Root>
    );

};

export default DashboardLayout;