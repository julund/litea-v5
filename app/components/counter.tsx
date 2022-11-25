// import { useEffect, useRef } from "react";
// import { useCounter, usePrevious } from "react-use";
// import { useSpring, a } from "react-spring";

// export default function Counter({ value, callback, config, ...props }) {
//   if (!callback) callback = (value) => value;
//   // const ref = useRef();
//   const [current, { set: setCurrent }] = useCounter(0);
//   const [next, { set: setNext }] = useCounter(value);
//   const from = usePrevious(next);
//   useEffect(() => {
//     // console.log({ value, next, from })
//     setNext(value);
//   }, [value,setNext]);
//   const styles = useSpring({
//     config: {...config},
//     from: { count: from || 0 },
//     to: { count: value || 0 },
//     onChange: (val) => setCurrent(val.value.count) // ref.current.textContent = val.value.count.toFixed(0) || 0
//   });
//   // return <span ref={ref} {...props} />
//   return (
//     <a.span {...props} style={styles}>
//     {callback(current)}
//     </a.span>
//   );
// }

export default function Counter({ value, className, ...props }: { value: number, className?: string; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) {
    return (
        <div className={className} {...props}>
            {value}
        </div>
    );
}