import { type ReactNode } from "react";
import Logo from "~/components/logo";

export const MinimalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-full bg-base-50">
            <Logo to="/"/>
            <div className="p-8 mx-auto max-w-4xl">
                {children}
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
        <div className="flex w-full min-h-full bg-base-50">
            {children}
        </div>
    );

};