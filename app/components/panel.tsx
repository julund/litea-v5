// import { intervalToDuration, formatDuration } from "date-fns";
import { format } from "numerable";
import type { Aggregates } from "~/utils/helpers";
import Counter from "./counter";
import { IconArrowUpRight } from "./icons";

// const short: Locale = {
//     formatDistance: (token, count) => {
//         return token === "xSeconds" ? `${count}s` :
//             token === "xMinutes" ? `${count}m` :
//                 `${count}h`; //"xHours"
//     }
// };

// const duration = (n: number, locale: Locale) => {
//     if (!n) return "0 s";
//     const duration = intervalToDuration({ start: 0, end: (n) || 0 });
//     return formatDuration(duration, { format: ["hours", "minutes", "seconds"], locale });
// };

const PanelItem = ({ counterValue, counterCallback, counterConfig, title }: { counterValue: number; counterCallback: Function; counterConfig?: { duration?: number | undefined; }; title: string }) => {
    return (
        <div className="flex flex-col items-center justify-center px-3 py-4 bg-white bg-opacity-50">
            <span className="flex flex-col gap-2 justify-center items-center">
                <span className="flex justify-center items-end text-base-600"><IconArrowUpRight className="text-green-500" size={16}/>12%</span>
                <Counter value={counterValue} callback={(value: number) => counterCallback(value)} config={counterConfig} className="text-3xl font-black tracking-wider tabular-nums font-title grow" />
            </span>
            <span className="text-sm text-gray-500 shrink">{title}</span> 
        </div>
    );
};

const Panel = ({ title, data }: { title: string; data: Aggregates }) => {

    return (
        <div className="flex flex-col">
            <div className="px-4 py-1 mb-1 text-sm font-bold">{title}</div>
            <div className="grid grid-cols-2 gap-4 text-sm text-center md:grid-cols-4">
                <PanelItem title="Total views" counterValue={data?.pageViews?.count || 0} counterCallback={(n: number) => format(n, "0")} />
                <PanelItem title="Unique visits" counterValue={data?.uniqueVisits?.count || 0} counterCallback={(n: number) => format(n, "0")} />
                <PanelItem title="Bounce rate" counterValue={data?.bounceRate?.count || 0} counterCallback={(n: number) => format(n, "0.0 %")} />
                <PanelItem title="Avg. visit duration" counterValue={data?.avgVisitDuration?.count || 0} counterCallback={
                    // (n: number) => duration(n, short)
                    (n: number) => format(n / 1000, "00:00:00")
                } />
            </div>
        </div>
    );
};

export default Panel;