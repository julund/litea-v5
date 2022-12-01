import { intervalToDuration, formatDuration } from "date-fns";
import { format } from "numerable";
import Counter from "./counter";

const short: Locale = {
    formatDistance: (token, count) => {
        return token === "xSeconds" ? `${count}s` :
            token === "xMinutes" ? `${count}m` :
                `${count}h`; //"xHours"
    }
};

const duration = (n: number, locale: Locale) => {
    if (!n) return "0 s";
    const duration = intervalToDuration({ start: 0, end: (n) || 0 });
    return formatDuration(duration, { format: ["hours", "minutes", "seconds"], locale });
};

const PanelItem = ({ counterValue, counterCallback, counterConfig, title }: { counterValue: number; counterCallback: Function; counterConfig?: any; title: string }) => {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-2 bg-white bg-opacity-50">
            <Counter value={counterValue} callback={(value: number) => counterCallback(value)} config={counterConfig} className="text-4xl font-black tracking-wider tabular-nums font-title grow" />
            <span className="text-sm text-gray-500 shrink">{title}</span>
        </div>
    );
};

const Panel = ({ title, stats }: { title: string; stats: any }) => {

    return (
        <div className="flex flex-col">
            <div className="px-4 py-1 mb-1 text-sm font-bold">{title}</div>
            <div className="grid grid-cols-2 gap-4 text-sm text-center md:grid-cols-4">
                <PanelItem title="Total views" counterValue={stats?.pageViews.count} counterCallback={(n: number) => format(n, "0")} />
                <PanelItem title="Unique visits" counterValue={stats?.uniqueVisits.count} counterCallback={(n: number) => format(n, "0")} />
                <PanelItem title="Bounce rate" counterValue={stats?.bounceRate.count} counterCallback={(n: number) => format(n, "0.0 %")} />
                <PanelItem title="Avg. visit duration" counterValue={stats?.avgVisitDuration.count} counterCallback={(n: number) => duration(n, short)} />
            </div>
        </div>
    );
};

export default Panel;