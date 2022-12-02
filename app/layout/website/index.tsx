import { type ReactNode } from "react";
import { Message } from "~/components/message";
import Main from '~/layout/shared/main';
import { type ISession } from "~/lib/session.server";
import Header from "../shared/header";
import Root from "../shared/root";
import Nav from "./nav";

const WebsiteLayout = ({ children, session }: { children: ReactNode; session?: ISession | null }) => {
    return (
        <Root>
            <Header>
                <Nav data={session?.data} />
                {session?.message && <Message message={session?.message} duration={5000} />}
            </Header>
            <Main>
                {children}
            </Main>
        </Root>
    );
};

export default WebsiteLayout;