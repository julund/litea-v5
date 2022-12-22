import { motion } from "framer-motion";
import { useMeasure, useWindowScroll } from "react-use";
import { classNames } from "~/utils/helpers";

const Header = ({ children, className = "", bgColor ="249 250 251" }: { children: React.ReactNode; className?: string; bgColor?: string;}) => {

    const [ref, { bottom }] = useMeasure<HTMLHeadElement>();
    const { y } = useWindowScroll();
    const scrollY = Math.min(y / (bottom * 2), 1) || 0;
    const bgOpacity = scrollY;
    const shadowOpacity = scrollY / 10;
    const paddingY = scrollY > 0.5 ? 0: 30;

    return (
        <motion.header
            ref={ref}
            className={classNames("fixed top-0 z-50 flex-grow-0 w-full", className)}
            animate={{ 
                backgroundColor: `rgb(${bgColor} / ${bgOpacity})`,
                boxShadow: `0 10px 15px -3px rgb(0 0 0 / ${shadowOpacity}), 0 4px 6px -4px rgb(0 0 0 / ${shadowOpacity})`,
                padding: `${paddingY}px 0px`
             }}
        >
            {children}
        </motion.header>
    );

};

export default Header;
