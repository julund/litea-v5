import React from "react";

const Container = ({ children, ...props } : { children: React.ReactNode; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {
    return(
        <div {...props} className="mx-auto px-6 max-w-5xl">
            {children}
        </div>
    );
};

export default Container;