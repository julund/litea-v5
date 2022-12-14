import { useLocation } from "@remix-run/react";
import { classNames } from "~/utils/helpers";

const Root = ({ children }: { children: React.ReactNode; }) => {
    const { pathname } = useLocation();
    return (
        <div className={classNames(pathname === "/" && "bg-map", "flex flex-col min-h-full bg-base-50/50")}>
            {children}
        </div>
    );

};

export default Root;