import { format } from "numerable";
import { useToggle } from "react-use";
import { type GraphData } from "~/utils/helpers";
import { Link } from "../link";
import Switch from "../switch";
import Bar from "../ui/bar";

const HorizontalBarChart = ({ data }: { data: Array<GraphData> }) => {

    // const totalPageViews = data && data?.reduce((total, item) => total + item.pageViews, 0);
    const maxPageViews = data && data?.reduce((total, item) => (item.pageViews > total) ? item.pageViews : total, 0) * 1.5;
    // const totalUniqueVisits = data && data?.reduce((total, item) => total + item.uniqueVisits, 0);
    const maxUniqueVisits = data && data?.reduce((total, item) => (item.uniqueVisits > total) ? item.uniqueVisits : total, 0) * 1.5;

    const modifiedData = data && data?.map(item => {
        return { ...item, pageViewsPercent: ((item.pageViews) / maxPageViews), uniqueVisitsPercent: ((item.uniqueVisits) / maxUniqueVisits) };
    });

    const [showPageViews, toggle] = useToggle(false);


    return (
        <div className="rounded-sm select-none bg-base-50 flex flex-col items-center justify-center gap-2 p-4">
            <Switch title={((showPageViews) => showPageViews ? "Page-views" : "Unique Visits")} size={18} onChange={toggle} className="text-xs flex gap-2 items-center" />
            <div className="flex flex-row justify-center w-full h-full gap-2">
                {modifiedData.map((item, i) => {
                    const hide = [7, 12, 11].includes(modifiedData.length) ? false : i % 2 !== 0;
                    return (
                        <div key={i} className="flex-grow bar group">
                            {/* {item.pageViews > 0 || item.pageViews === 0 ? */}
                            <Link to={item.period && `?period=${item.period}&time=${item.time}`} prefetch="intent" className="h-full opacity-80 hover:opacity-100 transition duration-300">
                                <div className="flex justify-center text-sm font-semibold p-1 h-6 rounded-sm text-base-700 opacity-0 group-hover:opacity-100 transition duration-500 mb-2">
                                    {format(showPageViews ? item.pageViews : item.uniqueVisits, "0a")}
                                </div>
                                <Bar value={showPageViews ? item.pageViewsPercent : item.uniqueVisitsPercent} inPercent={true} horizontal={false} />
                                <div className="flex justify-center text-center py-2 text-xs font-semibold text-base-700">
                                    {!hide && item.label}
                                </div>
                            </Link>
                            {/* :
                                <div className="h-full opacity-40 transition duration-300">
                                    <div className="flex justify-center text-sm font-semibold p-1 h-6 rounded-sm text-base-700 opacity-0 group-hover:opacity-100 transition duration-500 mb-2">
                                    </div>
                                    <Bar value={0} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-semibold text-base-800">
                                        {!hide && item.label}
                                    </div>
                                </div>
                            } */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HorizontalBarChart;