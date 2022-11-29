import { type ReactNode } from "react";
import Logo from "~/components/logo";

export const MinimalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-base-50">
            <Logo to="/"/>
            <div className="max-w-4xl p-8 mx-auto">
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
        <div className="flex flex-col w-full min-h-full bg-base-50">
            {children}
        </div>
    );

};