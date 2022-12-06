import { lowerCase } from "~/utils/helpers";
import Bar from "../ui/bar";
import Icon from "../icon";
import { Dialog } from "../dialog";
import Counter from "./../counter";
import { format } from "numerable";
import { motion } from "framer-motion";

const BarChartItem = ({ className, item, unknownName, iconCategory }: { className?: string; item: any; unknownName: string | null; iconCategory: string; }) => {
    return (
        <motion.div className={className}>
            <div className="flex flex-row items-center justify-between mb-1 text-sm break-all">
                <span className="flex items-center gap-1">
                    <Icon title={item?.countryCode ? item?.countryCode : item?.domain ? item?.domain : item.name} category={iconCategory} className="text-base-500" />
                    {item.name || unknownName}
                </span>
                <span className="flex items-end gap-2">
                    <Counter className="text-sm" value={item.count} callback={(value: number) => format(value, "0")} />
                    <Counter className="text-sm text-base-600 font-title tabular-nums" value={item.percent} callback={(value: number) => `(${format(item.percent ? value : 1, "0.0 %")})`} />
                </span>
            </div>
            <Bar value={item.percent} inPercent={true} />
        </motion.div>
    );
};

const VerticalBarChart = ({ title, unknownName = "unknown", emptyTitle = "none", data }: { title: string; unknownName?: string | null; emptyTitle?: string; data: Array<any> }) => {

    if (!unknownName) data = data.filter((item: any) => item.name !== "");

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
    const restItem = sumRest > 1 ? { name: `Other (${rest?.length} ${lowerCase(title)})`, count: sumRest, percent: (sumRest / sumAll) } : null;
    const emptyItem = modifiedData?.length == 0 ? { name: emptyTitle, count: 0, percent: 0 } : null;

    return (
        <div className="flex flex-col gap-4 py-2">
            {/* <div className="text-sm font-bold">{title}</div> */}
            {emptyItem && <BarChartItem item={emptyItem} iconCategory={title} unknownName={unknownName} />}
            {modifiedData && modifiedData.map((item, i) => <BarChartItem key={i} item={item} iconCategory={title} unknownName={unknownName} className="group" />)}

            {modifiedRest &&
                <Dialog
                    title={title}
                    button={
                        <BarChartItem item={restItem} iconCategory={title} unknownName={unknownName} className="cursor-pointer hover:font-semibold group" />
                    }
                >
                    <div className="flex flex-col gap-4">
                        {modifiedRest.map((item, i) => <BarChartItem key={i} className="w-64 mb-4 group" item={item} iconCategory={title} unknownName={unknownName} />)}
                    </div>
                </Dialog>
            }
        </div>
    );
};

export default VerticalBarChart;