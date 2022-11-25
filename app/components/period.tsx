import { useState } from "react";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "./icons";
import { periodDates } from "~/utils/helpers";

interface Selection {
    period: string;
    index: number;
    title?: string;
    description?: string;
}

interface Options {
    key: React.Key | null | undefined;
    value: string | number | readonly string[];
    label:string | number | null | undefined;
}

const Period = ({ name, options, defaultValue }: { name?: string; options?: Options[], defaultValue: string }) => {

    const { title, description } = periodDates(defaultValue, 0);
    const [selection, setSelection] = useState<Selection>({ period: defaultValue, index: 0, title, description });

    const onSelectedChanged = (obj: any) => {

        const { title, description } = periodDates(obj.period, obj.index);
        setSelection({ ...obj, title, description });

    };

    const PeriodSelector = ({ selection }: { selection: Selection }) => {
        if (selection.period == "realtime") return null;
        const Left = () => <button className="select-none active:scale-90 active:text-primary-900" onClick={() => onSelectedChanged({ period: selection.period, index: selection.index + 1 })}><IconChevronLeft size={30} /></button>;
        const Right = () => selection.index > 0 ?
            <button className="select-none active:scale-90 active:text-primary-900" onClick={() => onSelectedChanged({ period: selection.period, index: selection.index - 1 })}><IconChevronRight size={30} /></button>
            : <IconChevronRight className="text-base-300" size={30} />;
        return <span className="flex flex-row"><Left /> <Right /></span>;
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex gap-2 justify-center items-center text-sm">
                    <div className="text-base-600">{selection.description}</div>
                    <div className="font-bold text-base-800">{selection.title}</div>
                    <PeriodSelector selection={selection} />
                </div>
            </div>
            <span className="flex relative items-center">
                <div className="flex absolute right-0 items-center m-2 pointer-events-none">
                    <IconChevronDown size={22} />
                </div>
                <select
                    name={name}
                    defaultValue={defaultValue}
                    // value={selection.period || defaultValue}
                    className="select"
                    onChange={({ target: { value } }) => onSelectedChanged({ period: value, index: 0 })}>
                    {options?.map(({ key, value, label }) =>
                        <option key={key} value={value}>{label}</option>
                    )}
                </select>
            </span>
        </>
    );
};

export default Period;