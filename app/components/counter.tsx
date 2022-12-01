import { useEffect } from "react";
import { useCounter, usePrevious } from "react-use";
import { animate, useMotionValue, } from "framer-motion";

export default function Counter({ value, callback, config, className }: { value: number, callback?: Function; config?: { duration?: number }; className?: string }) {
    if (!callback) callback = (value: number) => value;
    const [current, { set: setCurrent }] = useCounter(0);
    const [next, { set: setNext }] = useCounter(value);
    const previous = usePrevious(next);
    const from = useMotionValue(previous || 0)

    useEffect(() => setNext(value), [value, setNext]);

    useEffect(() => {
        animate(from, value || 0, {
            onUpdate: val => { setCurrent(val) },
            type: "tween", duration: config?.duration || undefined
        })
    }, [from, setCurrent, value, config])

    return (
        <span className={className}>
            {callback(current)}
        </span>
    );
}