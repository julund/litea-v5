import numbro from "numbro";
import { intervalToDuration, formatDuration } from "date-fns";
import Counter from "./counter";

numbro.zeroFormat("0");
const count = (n: number) => numbro(n || 0).format({
    average: true,
});
const percent = (n: number) => numbro(n || 0).format({
    output: "percent",
    spaceSeparated: true,
    mantissa: 1,
});

const short: Locale = {
    formatDistance: (token, count) => {
        return token === "xSeconds" ? `${count} s` :
            token === "xMinutes" ? `${count} m` :
                `${count} h`; //"xHours"
    }
};
const duration = (n: number) => {
    if (!n) return "0 s";
    const duration = intervalToDuration({ start: 0, end: (n) || 0 });
    return formatDuration(duration, { format: ["hours", "minutes", "seconds"], locale: short });
};

const PanelItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-center px-8 py-4 mb-1 bg-white bg-opacity-50">
            {children}
        </div>
    );
};

const Panel = ({ title, stats }: { title: string; stats: any }) => {

    return (
        <div className="flex flex-col p-4">
            <div className="px-4 py-1 mb-1 text-sm font-bold">{title}</div>
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <PanelItem>
                    <Counter value={stats?.pageViews.count} callback={(value: number) => count(value)} />
                    <span className="text-sm text-gray-500">Total views</span>
                </PanelItem>
                <PanelItem>
                    <Counter value={stats?.uniqueVisits.count} callback={(value: number) => count(value)} />
                    <span className="text-sm text-gray-500">Unique visits</span>
                </PanelItem>
                <PanelItem>
                    <Counter value={stats?.bounceRate.count} callback={(value: number) => percent(value)} />
                    <span className="text-sm text-gray-500">Bounce rate</span>
                </PanelItem>
                <PanelItem>
                    <Counter value={stats?.avgVisitDuration.count} config={{ duration: 650 }} callback={(value: number) => duration(value)} />
                    <span className="text-sm text-gray-500">Avg. visit duration</span>
                </PanelItem>
                {/* <div className="flex flex-row items-center justify-between px-4 py-1 mb-1 bg-gray-200" style={{ width: `${item.percent}%` }}></div> */}
            </div>
        </div>
    );
};

export default Panel;