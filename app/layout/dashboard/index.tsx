import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "./nav";

const DashboardLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <Header message={session?.message}>
               <Nav data={session?.data}/> 
            </Header>
            <Main>
                {children}
            </Main>
        </Root>
    );

};

export default DashboardLayout;