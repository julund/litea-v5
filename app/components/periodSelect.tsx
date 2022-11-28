import { useSubmit, useSearchParams, useTransition, Form } from "@remix-run/react";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "./icons";
import { periods, getPeriodDates } from "~/utils/helpers";
import Spinner from "~/components/ui/spinner";
import { useEffect } from "react";

export default function PeriodSelect() {

    const submit = useSubmit();
    const { state } = useTransition();

    const [searchParams] = useSearchParams();
    const period = searchParams.get("period") || "realtime";
    const index = Number(searchParams.get("index")) || 0;
    const { title, description } = getPeriodDates(period, index);

    const isLoading = state !== "idle";

    useEffect( () => {
        if(period === "realtime") {
            const interval = setInterval( () => {
                submit({ period, index: "0" })
            }, 60000)
            return () => clearInterval(interval);
        }
    },[period, submit])

    const incrementIndex = () => {
        const e = document?.querySelector('input[type=number]') as HTMLInputElement;
        if (e) e.stepUp()
    };
    const decrementIndex = () => {
        const e = document?.querySelector('input[type=number]') as HTMLInputElement;
        if (e) e.stepDown()
    };

    return (
        <Form method="get" className="flex items-center w-full gap-2">
            <div className="flex gap-1 text-lg grow">
                <div className="text-base-600">{description}</div>
                <div className="font-bold text-base-800">{title}</div>
            </div>
            {isLoading && <div className="flex gap-1 text-sm text-base-600 shrink animate-pulse">
                Loading... <Spinner/>
            </div>}
            <div className="flex items-center justify-center gap-2 text-sm shrink">
                <input
                    name="index"
                    defaultValue={index}
                    type="number"
                    min="0"
                    className="hidden"
                    onChange={({ target: { value } }) => value && submit({ period, index: value })}
                />
                <button onClick={incrementIndex} className="py-1 rounded-sm px2- bg-base-100 hover:bg-base-200 disabled:opacity-25" disabled={period === "realtime"}>
                    <IconChevronLeft size={28} />
                </button>
                <button onClick={decrementIndex} className="py-1 rounded-sm px2- bg-base-100 hover:bg-base-200 disabled:opacity-25" disabled={index <= 0 || period === "realtime"} >
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