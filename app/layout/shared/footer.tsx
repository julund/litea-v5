
const Footer = ({ children }: { children: React.ReactNode; }) => {

    return (
        <footer className="flex-grow-0 py-4 bg-gray-100 font-body">
            {children}
        </footer>
    );

};

export default Footer;