import { useSubmit, useSearchParams, useTransition, Form } from "@remix-run/react";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "./icons";
import { periods, getPeriodDates } from "~/utils/helpers";
import Spinner from "~/components/ui/spinner";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export default function PeriodSelect() {

    const submit = useSubmit();
    const { state } = useTransition();

    const [searchParams] = useSearchParams();
    const period = searchParams.get("period") || "realtime";
    const index = Number(searchParams.get("index")) || 0;
    const { title, description } = getPeriodDates(period, index);

    // const isLoading = state !== "idle";
    const [isLoading, setIsLoading] = useState(false);
    useDebounce(() => setIsLoading(state !== "idle"), 100, [state]);

    useEffect(() => {
        if (period === "realtime") {
            const interval = setInterval(() => {
                submit({ period, index: "0" })
            }, 60000)
            return () => clearInterval(interval);
        }
    }, [period, submit])

    const incrementIndex = () => {
        const e = document?.querySelector('input[type=number]') as HTMLInputElement;
        if (e) e.stepUp()
    };
    const decrementIndex = () => {
        const e = document?.querySelector('input[type=number]') as HTMLInputElement;
        if (e) e.stepDown()
    };

    return (
        <Form method="get" className="flex items-center w-full gap-2 p-4">
            <div className="flex items-center gap-2 grow">
                <div className="text-4xl font-black font-title text-base-800">{title}</div>
                <div className="text-2xl text-base-500">{description}</div>
            </div>
            {isLoading && <div className="flex gap-1 text-sm text-base-600 shrink animate-pulse">Loading... <Spinner /></div>}
            <div className="flex items-center justify-center gap-2 text-sm shrink">
                <input
                    name="index"
                    defaultValue={index}
                    type="number"
                    min="0"
                    className="hidden"
                    onChange={({ target: { value } }) => value && submit({ period, index: value })}
                />
                <button onClick={incrementIndex} className="px-2 py-1 rounded-sm bg-base-100 hover:bg-base-200 disabled:opacity-25" disabled={period === "realtime"}>
                    <IconChevronLeft size={28} />
                </button>
                <button onClick={decrementIndex} className="px-2 py-1 rounded-sm bg-base-100 hover:bg-base-200 disabled:opacity-25" disabled={index <= 0 || period === "realtime"} >
                    <IconChevronRight size={28} />
                </button>
            </div>
            <div className="relative flex items-center shrink">
                <div className="absolute right-0 flex items-center m-2 pointer-events-none">
                    <IconChevronDown size={22} />
                </div>
                <select
                    name="period"
                    defaultValue={period}
                    className="select"
                    onChange={({ target: { value } }) => submit({ period: value, index: "0" })}
                >
                    {periods?.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
            </div>
        </Form>

    )
}