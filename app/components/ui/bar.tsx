import { useSpring, animated, config } from "react-spring";
import { useMeasure } from "react-use";

const Bar = ({ value, inPercent = false, max = 100, horizontal = true, ...props }: {
        value: number;
        inPercent?: boolean;
        max?: number;
        horizontal?: boolean;
        props?: any;
    }) => {

    const [ref, { width, height }] = useMeasure<HTMLDivElement>();
    const currentValue = Math.min(inPercent ? value * (horizontal ? width : height) : value * (horizontal ? width : height) / max, (horizontal ? width : height)) || 0;
    const horizontalStyles = useSpring({ to: { width: currentValue }, from: { width: 0 }, config: config.default });
    const verticalStyles = useSpring({ to: { height: currentValue }, from: { height: 0 }, config: config.default });

    if (horizontal) return (
        <div className="relative flex-grow h-4 overflow-hidden rounded-sm">
            <div ref={ref} className="absolute w-full h-full bg-base-200"></div>
            <animated.div style={horizontalStyles} className="relative h-full rounded-sm bg-primary-700 bg-opacity-80 group-hover:bg-opacity-100"></animated.div>
        </div>
    );
    return (
        <div className="relative flex items-end justify-center flex-grow h-24 overflow-hidden rounded-sm" {...props}>
            <div ref={ref} className="absolute w-full h-full bg-base-200"></div>
            <animated.div style={verticalStyles} className="relative w-full rounded-sm bg-primary-700 bg-opacity-80 group-hover:bg-opacity-100"></animated.div>
        </div>
    );
};

export default Bar;