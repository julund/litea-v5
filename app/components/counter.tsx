import { useEffect } from "react";
import { useCounter, usePrevious } from "react-use";
import { animate, useMotionValue, } from "framer-motion";

export default function Counter({ value, defaultValue = 0, callback, config, className }: { value: number; defaultValue?: number; callback?: Function; config?: { duration?: number }; className?: string }) {
    if (!callback) callback = (value: number) => value;
    const [current, { set: setCurrent }] = useCounter(defaultValue);
    const [next, { set: setNext }] = useCounter(value);
    const previous = usePrevious(next);
    const from = useMotionValue(previous || defaultValue)

    useEffect(() => setNext(value), [value, setNext]);

    useEffect(() => {
        animate(from, value, {
            onUpdate: val => { setCurrent(val) },
            type: "tween", duration: config?.duration || undefined
        })
    }, [from, setCurrent, value, defaultValue, config])

    return (
        <span className={className}>
            {callback(current)}
        </span>
    );
}