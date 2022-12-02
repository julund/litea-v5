import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "../shared/nav";
import { Message } from "~/components/message";
import { IconUser, IconSettings, IconLogout } from "~/components/icons";
import { NavLink } from "~/components/link";

const DashboardLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <Header>
                <Nav>
                    <div className="flex items-center gap-2 px-4 py-2 text-base-500"><IconUser />{session?.data?.handle}</div>
                    <NavLink to="/dashboard/account"><IconSettings size={22} />Account</NavLink>
                    <NavLink to="/logout"><IconLogout />Log out</NavLink>
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