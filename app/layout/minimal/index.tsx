import { type ReactNode } from "react";
import Main from '~/layout/shared/main';
import { type ISession } from "~/lib/session.server";
import Root from "../shared/root";
import Nav from "./nav";

const MinimalLayout = ({ children, session }: { children: ReactNode; session?: ISession; }) => {

    return (
        <Root>
            <header>
                <Nav />
            </header>
            <Main>
                {children}
            </Main>
        </Root>
    );

};

export default MinimalLayout;
