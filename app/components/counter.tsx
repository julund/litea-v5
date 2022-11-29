import { useEffect } from "react";
import { useCounter, usePrevious } from "react-use";
import { useSpring, a } from "react-spring";

export default function Counter({ value, callback, config, ...props }: { value: number, callback?: Function; config?: any; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) {
    if (!callback) callback = (value: number) => value;
    const [current, { set: setCurrent }] = useCounter(0);
    const [next, { set: setNext }] = useCounter(value);
    const from = usePrevious(next);
    useEffect(() => {
        // console.log({ value, next, from })
        setNext(value);
    }, [value, setNext]);
    const styles = useSpring({
        config: { ...config },
        from: { count: from || 0 },
        to: { count: value || 0 },
        onChange: (val) => setCurrent(val.value.count) // ref.current.textContent = val.value.count.toFixed(0) || 0
    }) as any;

    return (
        <a.span className="text-4xl font-black tracking-wider tabular-nums font-title" style={styles} {...props}>
            {callback(current)}
        </a.span>
    );
}