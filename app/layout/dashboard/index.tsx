import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "../shared/nav";
import { Message } from "~/components/message";
import { IconSettings, IconLogout, IconDashboard, IconChevronUp, IconChevronDown } from "~/components/icons";
import { IndexNavLink, NavLink } from "~/components/link";

const DashboardLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <Header>
                <Nav
                    forceToggle
                    absolute
                    className="flex flex-col items-start self-end gap-2 px-4 py-2 rounded-sm bg-base-100 max-w-min"
                    buttonContent={ (e: any) => <div className="flex items-center gap-2 text-base-500">{session?.data?.handle}{e ? <IconChevronUp size={16} className="text-base-400"/> : <IconChevronDown size={16} className="text-base-400"/>}</div>}
                >
                    <IndexNavLink to="/dashboard"><IconDashboard size={22} />Dashboard</IndexNavLink>
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