const Root = ({ children }: { children: React.ReactNode; }) => {

    return (
        <div className="flex flex-col min-h-full bg-base-50">
            {children}
        </div>
    );

};

export default Root;