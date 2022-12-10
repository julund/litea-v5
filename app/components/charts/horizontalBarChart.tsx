import { format } from "numerable";
import { Link } from "../link";
import Bar from "../ui/bar";
import Spinner from "../ui/spinner";
// import Tooltip from "../ui/tooltip";

const HorizontalBarChart = ({ data }: { data: Array<any> }) => {

    // const sumAll = data && data?.reduce((total, item) => total + (item?.pageViews || 0), 0);
    // const dataWithPercent = data && data?.map(item => {
    //     return { ...item, percent: ((item?.pageViews || 0) / sumAll), uniquePercent: ((item?.uniqueVisits || 0) / sumAll) };
    // });
    // const modifiedData = dataWithPercent;

    const max = data && data?.reduce((total, item) => (item?.pageViews > total) ? item?.pageViews : total, 0) * 1.25;
    const dataValues = data && data?.map(item => {
            return { ...item, percent: ((item?.pageViews || 0) / max), uniquePercent: ((item?.uniqueVisits || 0) / max) };
        });
    const modifiedData = dataValues;

    return (
        <div className="rounded-sm select-none bg-base-50">
            <div className="flex flex-row justify-center w-full h-full gap-2 p-4">
                {!modifiedData && <div className="flex items-center"> <Spinner size={64} /> </div>}
                {modifiedData && modifiedData.map((item, i) => {
                    const len = modifiedData.length;
                    const hide = (len === 7 || len === 12 || len === 11) ? false : len > 30 ? i % 4 !== 0 : i % 2 !== 0;
                    return (
                        <div key={i} className="flex-grow bar group">
                            {item.pageViews > 0 || item.pageViews === 0 ?
                            <Link to={item.period && `?period=${item.period}&time=${item.time}`} prefetch="intent" className="h-full opacity-80 hover:opacity-100 transition duration-300">
                                {/* <div className="h-full cursor-pointer opacity-80 hover:opacity-100 transition duration-300"> */}
                                    <div className="flex justify-center text-sm font-semibold p-1 h-6 rounded-sm text-base-700 opacity-0 group-hover:opacity-100 transition duration-500 mb-2">
                                        {format(item.pageViews, "0a")}
                                    </div>
                                    <Bar value={item.percent} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-semibold text-base-700">
                                        {!hide && item.label}
                                    </div>
                                {/* </div> */}
                                </Link>
                                 :
                                <div className="h-full opacity-70 transition duration-300">
                                    <div className="flex justify-center text-sm font-semibold p-1 h-6 rounded-sm text-base-700 opacity-0 group-hover:opacity-100 transition duration-500 mb-2">
                                    </div>
                                    <Bar value={0} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-semibold text-base-800">
                                        {!hide && item.label}
                                    </div>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HorizontalBarChart;