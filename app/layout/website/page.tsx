import { LazyMotion, motion } from "~/lib/motion";
const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation)

export default function Page({ children, ...props }: { children: React.ReactNode; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) {

    return (
        <LazyMotion features={loadFeatures}>
            <motion.div className="p-10" {...props}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  }}
            >
                {children}
            </motion.div>
        </LazyMotion>
    );

};