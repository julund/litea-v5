import { useSubmit, useSearchParams, useTransition, Form } from "@remix-run/react";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "./icons";
import { periods, getPeriodByName } from "~/utils/helpers";
import Spinner from "~/components/ui/spinner";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Link } from "./link";

export default function PeriodSelect() {

    const submit = useSubmit();
    const { state } = useTransition();

    const [searchParams] = useSearchParams();
    const period = searchParams.get("period") || "realtime";
    const time = searchParams.get("time") || undefined;
    const { title, description, previous, next } = getPeriodByName(period, time);

    // const isLoading = state !== "idle";
    const [isLoading, setIsLoading] = useState(false);
    useDebounce(() => setIsLoading(state !== "idle"), 100, [state]);

    useEffect(() => {
        if (period === "realtime") {
            const interval = setInterval(() => {
                submit({ period });
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [period, submit]);

    return (
        <Form method="get" className="flex flex-col-reverse items-center w-full gap-2 p-4 md:flex-row grow">
            <div className="flex items-center gap-2 grow">
                <div className="text-2xl font-black font-title text-base-800">{title}</div>
                <div className="text-2xl font-title text-base-500">{description}</div>
            </div>
            {isLoading && <div className="flex gap-1 text-sm text-base-600 shrink animate-pulse">Loading... <Spinner /></div>}
            <div className="flex items-center justify-center gap-2 text-sm shrink">

                {(period === "realtime" || !previous) ?
                    <span className="px-2 py-1 rounded-sm opacity-25 bg-base-100"><IconChevronLeft size={28} /></span> :
                    <Link to={`?period=${period}&time=${previous}`} prefetch="intent" className="px-2 py-1 rounded-sm bg-base-100 hover:bg-base-200">
                        <IconChevronLeft size={28} />
                    </Link>
                }
                {(period === "realtime") || !next ?
                    <span className="px-2 py-1 rounded-sm opacity-25 bg-base-100"><IconChevronRight size={28} /></span> :
                    <Link to={`?period=${period}&time=${next}`} prefetch="intent" className="px-2 py-1 rounded-sm bg-base-100 hover:bg-base-200">
                        <IconChevronRight size={28} />
                    </Link>
                }
            </div>
            <div className="relative flex items-center shrink">
                <div className="absolute right-0 flex items-center m-2 pointer-events-none">
                    <IconChevronDown size={22} />
                </div>
                <select
                    name="period"
                    defaultValue={period}
                    className="select"
                    onChange={({ target: { value } }) => submit({ period: value, time: time || "" })}
                >
                    {periods?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>
        </Form>

    );
}