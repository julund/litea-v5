import { lowerCase, type NameCountData } from "~/utils/helpers";
import Bar from "../ui/bar";
import Icon from "../icon";
import { Dialog } from "../dialog";
import Counter from "./../counter";
import { format } from "numerable";
import { motion } from "framer-motion";

const BarChartItem = ({ className, item, unknownName, iconCategory }: { className?: string; item: NameCountData & { percent: number }; unknownName: string | null; iconCategory: string; }) => {
    return (
        <motion.div className={className}>
            <div className="flex flex-row items-center justify-between gap-2 mb-1 text-sm break-all">
                <div className="flex items-center gap-1">
                    {!item?.name?.includes(" other ") && <Icon title={item?.countryCode ? item?.countryCode : item?.domain ? item?.domain : item.name} category={iconCategory} className="text-base-500" />}
                    <span className="max-w-sm line-clamp-1">{item.name || unknownName}</span>
                </div>
                <div className="flex items-end gap-2">
                    <Counter className="text-sm font-title" value={item.count} callback={(value: number) => format(value, "0")} />
                    <Counter className="text-sm text-base-600 font-title tabular-nums" value={item.percent} callback={(value: number) => `(${format(item.percent ? value : 1, "0.0 %")})`} />
                </div>
            </div>
            <Bar value={item.percent} inPercent={true} />
        </motion.div>
    );
};

const VerticalBarChart = ({ title, unknownName = "unknown", emptyTitle = "none", data }: { title: string; unknownName?: string | null; emptyTitle?: string; data: Array<NameCountData> }) => {

    if (!unknownName) data = data.filter((item) => item.name !== "");

    const sumAll = data && data?.reduce((total, item) => total + item.count, 0);
    const dataWithPercent = data && data?.map(item => {
        return { ...item, percent: (item.count / sumAll) };
    }).sort((a, b) => (a.count > b.count) ? -1 : 1);

    const numItemsTop = 4;
    const top = (dataWithPercent && dataWithPercent?.filter((_, i) => i <= (numItemsTop - 1))) || undefined;
    const rest = dataWithPercent && dataWithPercent?.filter((_, i) => i >= numItemsTop);
    const sumRest = rest && rest?.reduce((total, item) => total + item.count, 0);
    const modifiedData = sumRest > 1 ? top && [...top] : top && [...top, ...rest];
    const modifiedRest = sumRest > 1 ? [...rest] : null;
    const restItem = sumRest > 1 ? { name: `› ${rest?.length} other ${lowerCase(title)}`, count: sumRest, percent: (sumRest / sumAll) } : null;
    const emptyItem = modifiedData?.length == 0 ? { name: emptyTitle, count: 0, percent: 0 } : null;

    return (
        <div className="flex flex-col gap-4 py-2">
            {/* <div className="text-sm font-bold">{title}</div> */}
            {emptyItem && <BarChartItem item={emptyItem} iconCategory={title} unknownName={unknownName} />}
            {modifiedData && modifiedData.map((item, i) => <BarChartItem key={i} item={item} iconCategory={title} unknownName={unknownName} className="transition-opacity duration-300 rounded-sm opacity-80 hover:opacity-100 group" />)}
            {(modifiedRest && restItem) &&
                <Dialog
                    title={title}
                    toggleButton={
                        <BarChartItem item={restItem} iconCategory={title} unknownName={unknownName} className="px-4 py-2 transition-opacity duration-300 rounded-sm cursor-pointer hover:bg-base-100 opacity-80 hover:opacity-100 group" />
                    }
                    buttons="close"
                    onSubmit={(value) => console.log("onSubmit", value)}
                >
                    <div className="flex flex-col gap-4">
                        {modifiedRest.map((item, i) => <BarChartItem key={i} className=" min-w-[288px] mb-4 group" item={item} iconCategory={title} unknownName={unknownName} />)}
                    </div>
                </Dialog>
            }
        </div>
    );
};

export default VerticalBarChart;