import { type ReactNode } from "react";
import Main from "~/layout/shared/main";
import { type ISession } from "~/lib/session.server";
import Root from "../shared/root";
import Nav from "../shared/nav";
import Header from "../shared/header";
import { Message } from "~/components/message";

const MinimalLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <Header>
                <Nav/>
                <Message message={session?.message} duration={5000} />
            </Header>
            <Main>
                {children}
            </Main>
        </Root>
    );

};

export default MinimalLayout;
