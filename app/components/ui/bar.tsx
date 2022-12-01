import { LazyMotion, motion } from "~/lib/motion";
import { useMeasure } from "react-use";
import { classNames } from "~/utils/helpers";

const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation)

const Bar = ({ value, inPercent = false, max = 100, horizontal = true, ...props }: {
    value: number;
    inPercent?: boolean;
    max?: number;
    horizontal?: boolean;
    props?: any;
}) => {

    const [ref, { width, height }] = useMeasure<HTMLDivElement>();

    const currentValue = Math.min(inPercent ? value * (horizontal ? width : height) : value * (horizontal ? width : height) / max, (horizontal ? width : height)) || 0;

    const parentClasses = classNames("relative flex-grow overflow-hidden rounded-sm", horizontal ? "h-4" : "h-24 flex items-end justify-center")
    const childClasses = classNames("relative rounded-sm bg-primary-700 bg-opacity-80 group-hover:bg-opacity-100", horizontal ? "h-full" : "w-full")

    return (
        <LazyMotion features={loadFeatures}>
        <div className={parentClasses} {...props}>
            <div ref={ref} className="absolute w-full h-full bg-base-200"></div>
            <motion.div
                initial={horizontal ? { width: 0 } : { height: 0 }}
                animate={horizontal ? { width: currentValue } : { height: currentValue }}
                transition={{ }}
                className={childClasses}
            ></motion.div>
        </div>
        </LazyMotion>
    );
};

export default Bar;