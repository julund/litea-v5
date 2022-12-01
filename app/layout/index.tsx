import { type ReactNode } from "react";
import Logo from "~/components/logo";
import Page from '~/layout/website/page';

export const MinimalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-full bg-base-50">
            <div className="p-8 shrink">
                <Logo to="/" />
            </div>
            <div className="flex flex-col items-center justify-center grow">
                <Page>
                    {children}
                </Page>
            </div>
        </div>
    );
};

export const WebsiteLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-full bg-base-50">
            {children}
        </div>
    );
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="flex flex-col w-full min-h-full bg-base-50">
            {children}
        </div>
    );

};