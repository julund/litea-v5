import { LazyMotion, motion } from "~/lib/motion";
const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation);

const Container = ({ children, ...props }: { children: React.ReactNode; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {

    return (
        <LazyMotion features={loadFeatures}>
            <motion.div className="flex mx-auto px-6 max-w-lg min-h-[70vh] items-center justify-center" {...props}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  }}
            >
                {children}
            </motion.div>
        </LazyMotion>
    );

};

export default Container;