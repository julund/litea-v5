import { classNames } from "~/utils/helpers";

const Header = ({ children, className = "bg-base-50" }: { children: React.ReactNode; className?: string; }) => {

    return (
        <header className={classNames("sticky top-0 z-50 flex-grow-0 w-full", className)}>
            {children}
        </header>
    );

};

export default Header;