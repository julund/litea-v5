import Bar from "../ui/bar";
import Spinner from "../ui/spinner";
// import Tooltip from "../ui/tooltip";

const HorizontalBarChart = ({ data }: { data: Array<any> }) => {

    const sumAll = data && data?.reduce((total, item) => total + (item?.pageViews || 0), 0);
    const dataWithPercent = data && data?.map(item => {
        return { ...item, percent: ((item?.pageViews || 0) / sumAll), uniquePercent: ((item?.uniqueVisits || 0) / sumAll) };
    });
    const modifiedData = dataWithPercent;

    return (
        <div className="h-40 rounded-sm select-none bg-base-50">
            <div className="flex flex-row justify-center w-full h-full gap-1 p-4">
                {!modifiedData && <div className="flex items-center"> <Spinner size={64} /> </div>}
                {modifiedData && modifiedData.map((item, i) => {

                    const len = modifiedData.length;
                    const hide = (len === 7 || len === 12 || len === 11) ? false : len > 30 ? i % 4 !== 0 : i % 2 !== 0;

                    // if (!item.pageViews) return(<div key={i} className="flex-grow"></div>);
                    return (
                        <div key={i} className="flex-grow bar">
                            {item.pageViews > 0 || item.pageViews === 0 ?
                                <div className="h-full cursor-pointer opacity-80 hover:opacity-100">
                                    <Bar value={item.percent} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-bold text-gray-800">
                                        {!hide && item.label}
                                    </div>
                                </div> :
                                <div className="h-full opacity-70">
                                    <Bar value={0} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-bold text-gray-800">
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