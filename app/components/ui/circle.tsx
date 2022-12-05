import { LazyMotion, motion } from "~/lib/motion";

const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation);

const Circle = ({ size, children }: {
    size: number;
    children: React.ReactNode;
}) => {

    return (
        <LazyMotion features={loadFeatures}>
            <motion.div 
                className="flex items-center justify-center p-2 rounded-full bg-base-200"
                initial={{ width: 0, height: 0 }}
                animate={{ width: size, height: size }}
            >
                {children}
            </motion.div>
        </LazyMotion>
    );
};

export default Circle;