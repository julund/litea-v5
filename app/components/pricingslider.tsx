import { useEffect, useState } from "react";
import { useCounter } from "react-use";
import { format } from "numerable";

const BASE = 8.05;
const PPR = 0.0000195;
const DIV = 50000000;
const MXD = 0.30;

const Pricingslider = () => {

    const min = 100000;
    const max = 10000000;
    const [value, { set, reset }] = useCounter(min, max, min);
    const [result, setResult] = useState({ price: 0, discount: 0, total: 0 });

    const calculatedPrice = (value: number) => Number((BASE + (value * PPR)).toFixed(2));
    const calculatedDiscount = (value: number) => Number(Math.min((value / DIV), MXD).toFixed(2));

    useEffect(() => {
        const price = calculatedPrice(value);
        const discount = calculatedDiscount(value);
        const total = Number((price - (price * discount)).toFixed(2));
        setResult({ price, discount: discount, total });
    }, [value]);

    return (
        <div className="flex flex-col gap-4 p-8 rounded-sm bg-base-100">
            <span className="text-3xl font-semibold">{format(value, "0,0")}</span>
            <span className="text-base-700">monthly pageviews</span>
            <input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} className="slider" id="pricing"></input>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-sm bg-base-200">
                <div>
                    <div className="text-sm text-base-600">Base price</div>
                    <del className="text-lg font-medium text-base-800">${format(result.price,"$ 0.00")}</del>
                </div>
                <div>
                    <div className="text-sm text-base-600">discount</div>
                    <div className="text-lg font-medium text-base-800">{format(result.discount,"0 %")}</div>
                </div>
                <div>
                    <div className="text-sm text-base-600">Your price</div>
                    <div className="text-lg font-medium text-base-800">${format(result.total,"$ 0.00")}</div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(100000)}>100k</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(250000)}>250k</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(500000)}>500k</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(1000000)}>1 m</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(5000000)}>5 m</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => set(10000000)}>10 m</button>
                <button className="text-sm rounded-sm text-base-600" onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );

};

export default Pricingslider;