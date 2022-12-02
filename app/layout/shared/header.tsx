const Header = ({ children }: { children: React.ReactNode; }) => {

    return (
        <header className="sticky top-0 z-10 flex-grow-0 w-full bg-base-50">
            {children}
        </header>
    );

};

export default Header;