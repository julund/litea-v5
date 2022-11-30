import numbro from "numbro";
import { lowerCase } from "~/utils/helpers";
import Bar from "../ui/bar";
import Icon from "../icon";
import { Dialog } from "../dialog";

const countFormat = {
    average: true,
};

const percentFormat: numbro.Format = {
    output: "percent",
    spaceSeparated: true,
    mantissa: 0
};

const BarChartItem = ({ className, item, unknownTitle, iconCategory }: { className?: string; item: any; unknownTitle: string; iconCategory: string; }) => {
    return (
        <div className={className}>
            <div className="flex flex-row items-center justify-between mb-1 text-sm break-all">
                <span className="flex items-center gap-1">
                    <Icon title={item?.countryCode ? item?.countryCode : item?.domain ? item?.domain : item.name} category={iconCategory} className="text-base-500" />
                    {item.name || unknownTitle}
                </span>
                <span>
                    {numbro(item.count).format(countFormat)} <small>({item.percent ? numbro(item.percent).format(percentFormat) : "100 %"})</small>
                </span>
            </div>
            <Bar value={item.percent} inPercent={true} />
        </div>
    )
}

const VerticalBarChart = ({ title, unknownTitle = "unknown", emptyTitle = "none", data }: { title: string; unknownTitle?: string; emptyTitle?: string; data: Array<any> }) => {

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
    const restItem = sumRest > 1 ? { name: `Other (${rest?.length} additional ${lowerCase(title)})`, count: sumRest, percent: (sumRest / sumAll) } : null;
    const emptyItem = modifiedData?.length == 0 ? { name: emptyTitle, count: 0, percent: 0 } : null;

    return (
        <div className="flex flex-col py-2">
            {/* <div className="text-sm font-bold">{title}</div> */}
            <div className="flex flex-col gap-4">
                {/* {emptyItem && <div className="text-lg font-medium text-base-400 font-title">No data.</div>} */}
                {emptyItem && <BarChartItem item={emptyItem} iconCategory={title} unknownTitle={unknownTitle} />}
                {modifiedData && modifiedData.map((item, i) => <BarChartItem key={i} item={item} iconCategory={title} unknownTitle={unknownTitle} />)}

                {modifiedRest && <Dialog className="p-8 rounded-sm shadow-md transition-opacity duration-500 opacity-0 open:opacity-100" button={
                    <BarChartItem item={restItem} iconCategory={title} unknownTitle={unknownTitle} />
                }>
                    <div className="">
                        <h3>{title}</h3>
                        {modifiedRest.map((item, i) => <BarChartItem key={i} className="mb-4 w-64" item={item} iconCategory={title} unknownTitle={unknownTitle} />)}
                    </div>
                </Dialog>
                }
                {/* {restItem &&
                    <details className="">
                        <summary className="mb-4 cursor-pointer hover:font-semibold">
                            <BarChartItem item={restItem} iconCategory={title} unknownTitle={unknownTitle} />
                        </summary>
                        {modifiedRest && modifiedRest.map((item, i) => <BarChartItem key={i} className="mb-4 scale-90" item={item} iconCategory={title} unknownTitle={unknownTitle} />)}
                    </details>
                } */}
            </div>
        </div>
    );
};

export default VerticalBarChart;