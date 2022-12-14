import { motion } from "framer-motion";
import { useMeasure, useWindowScroll } from "react-use";
import { classNames } from "~/utils/helpers";

const Header = ({ children, className = "", bgColor ="249 250 251" }: { children: React.ReactNode; className?: string; bgColor?: string;}) => {

    const [ref, { bottom }] = useMeasure<HTMLHeadElement>();
    const { y } = useWindowScroll();
    const opacity = Math.min(y / (bottom * 2), 1) || 0;

    return (
        <motion.header
            ref={ref}
            className={classNames("sticky top-0 z-50 flex-grow-0 w-full", className)}
            animate={{ 
                backgroundColor: `rgb(${bgColor} / ${opacity})`,
                padding: 1
             }}
            transition= {{ duration: 0.1 }}
        >
            {children}
        </motion.header>
    );

};

export default Header;