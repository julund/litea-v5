import { motion } from "framer-motion";

const Container = ({ children, ...props }: { children: React.ReactNode; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {

    return (
        <motion.div className="max-w-4xl px-8 py-4 mx-auto" {...props}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
        >
            {children}
        </motion.div>
    );

};

export default Container;