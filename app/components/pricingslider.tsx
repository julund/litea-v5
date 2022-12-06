import { useEffect, useState } from "react";
import { useCounter, useDebounce } from "react-use";
import { format } from "numerable";
import Counter from "./counter";
import Switch from "./switch";

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

    const [isYearly, setIsYearly] = useState(false);

    const handleBillingPeriodChanged = (checked: boolean) => setIsYearly(checked);

    useEffect(() => {
        let price = +(BASE + (value * PPR)).toFixed(5);
        if (isYearly) price = (price * 12);
        let discount = +Math.min((value / DIV), MXD);
        if (isYearly) discount = (discount * 1.75);
        discount = +discount.toFixed(2);
        const total = price - (price * discount);
        setResult({ price, discount, total });
    }, [value, isYearly]);

    return (
        <div className="flex flex-col gap-4 p-8 rounded-sm bg-base-100">
            {/* <span className="text-3xl font-semibold">{format(value, "0,0")}</span> */}
            <Counter className="text-3xl font-semibold" value={value} defaultValue={min} callback={(n: number) => format(n, "0,0")} />
            <span className="text-base-700">monthly pageviews</span>
            <input type="range" min={min} max={max} value={inputValue} step={1} onChange={(e) => set(Number(e.target.value))} className="slider" id="pricing"></input>
            <div className="flex flex-col gap-2 p-4 rounded-sm bg-base-200">
                <div className="flex flex-col gap-2 justify-items-stretch">
                    <div className="text-sm grow text-base-500">Base price</div>
                    <Counter className="px-4 py-2 text-lg font-medium text-right rounded-sm shrink font-title text-base-600 bg-base-100" value={result.price} callback={(n: number) => format(n, "$ 0.00", { currency: "USD" })} />
                    <div className="text-sm grow text-base-500">Volume discount</div>
                    <Counter className="px-4 py-2 text-lg font-medium text-right rounded-sm shrink font-title text-base-600 bg-base-100" value={result.discount} callback={(n: number) => format(n, "0 %")} />
                    <div className="text-sm grow text-base-500">Your price</div>
                    <Counter className="px-4 py-2 text-4xl font-semibold text-right rounded-sm shrink font-title text-base-600 bg-base-100" value={result.total} callback={(n: number) => format(n, "$ 0.00", { currency: "USD" })} />
                    <div className="text-sm grow">
                        <Switch
                            className="flex items-center w-full gap-2 text-base-600"
                            title={((checked: boolean) => checked ? "Yearly billing" : "Monthly billing")}
                            onChange={handleBillingPeriodChanged}
                        />
                    </div>
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