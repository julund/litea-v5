
const Footer = ({ children }: { children: React.ReactNode; }) => {

    return (
        <footer className="flex-grow-0 py-4 bg-white/50">
            {children}
        </footer>
    );

};

export default Footer;