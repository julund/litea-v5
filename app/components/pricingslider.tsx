import { useEffect, useState } from "react";
import { useCounter, useDebounce } from "react-use";
import { format } from "numerable";
import Counter from "./counter";

const BASE = 7.50; // 8.05;
const PPR = 0.0000250; // 0.0000195;
const DIV = 42500000; // 50000000;
const MXD = 0.30; // 0.30;

const Pricingslider = () => {

    const min = 100000;
    const max = 10000000;
    const [inputValue, { set, reset }] = useCounter(min, max, min);
    const [result, setResult] = useState({ price: 0, discount: 0, total: 0 });

    const [value, setValue] = useState(min);
    useDebounce(() => setValue(inputValue), 10, [inputValue]);

    useEffect(() => {
        const price = +(BASE + (value * PPR)).toFixed(5);
        const discount = +Math.min((value / DIV), MXD).toFixed(4);
        const total = price - (price * discount);
        setResult({ price, discount, total });
    }, [value]);

    return (
        <div className="flex flex-col gap-4 p-8 rounded-sm bg-base-100">
            {/* <span className="text-3xl font-semibold">{format(value, "0,0")}</span> */}
            <Counter className="text-3xl font-semibold" value={value} defaultValue={min} callback={(n: number) => format(n, "0,0")}/>
            <span className="text-base-700">monthly pageviews</span>
            <input type="range" min={min} max={max} value={inputValue} step={1} onChange={(e) => set(Number(e.target.value))} className="slider" id="pricing"></input>
            <div className="flex flex-col gap-2 p-4 rounded-sm bg-base-200">
                <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-base-600">Base price</div>
                    <Counter className="col-span-2 text-lg font-medium text-right text-base-700" value={result.price} callback={(n: number) => format(n, "$ 0.00")}/>
                    {/* <del className="text-lg font-medium text-base-800">${format(result.price,"$ 0.00")}</del> */}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-base-600">Discount</div>
                    <Counter className="col-span-2 text-lg font-medium text-right text-primary-500" value={result.discount} callback={(n: number) => format(n, "0 %")}/>
                    {/* <div className="text-lg font-medium text-base-800">{format(result.discount,"0 %")}</div> */}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm text-base-600">Your price</div>
                    <Counter className="col-span-2 text-lg font-semibold text-right text-base-800" value={result.total} callback={(n: number) => `${format(n, "$ 0.00")} / mo`}/>
                    {/* <div className="text-lg font-medium text-base-800">${format(result.total,"$ 0.00")}</div> */}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
                <button className="text-sm button button-base" onClick={() => set(100000)}>100k</button>
                <button className="text-sm button button-base" onClick={() => set(250000)}>250k</button>
                <button className="text-sm button button-base" onClick={() => set(500000)}>500k</button>
                <button className="text-sm button button-base" onClick={() => set(1000000)}>1 m</button>
                <button className="text-sm button button-base" onClick={() => set(5000000)}>5 m</button>
                <button className="text-sm button button-base" onClick={() => set(10000000)}>10 m</button>
                <button className="text-sm button button-base" onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );

};

export default Pricingslider;