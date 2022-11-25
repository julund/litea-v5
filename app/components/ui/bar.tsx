import { useSpring, animated } from "react-spring";
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
    const horizontalStyles = useSpring({ to: { width: currentValue }, from: { width: 0 }, });
    const verticalStyles = useSpring({ to: { height: currentValue }, from: { height: 0 }, });

    return (
        <div className="relative flex items-end justify-center flex-grow h-24 overflow-hidden rounded" {...props}>
            <div ref={ref} className="absolute w-full h-full bg-gray-200"></div>
            <animated.div style={horizontal ? horizontalStyles : verticalStyles} className="relative w-full bg-blue-700 "></animated.div>
        </div>
    );
};

export default Bar;