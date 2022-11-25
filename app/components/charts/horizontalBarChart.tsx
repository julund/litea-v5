import Bar from "../ui/bar";
import Spinner from "../ui/spinner";
// import Tooltip from "../ui/tooltip";

const HorizontalBarChart = ({ data } : { data: Array<any> }) => {

    const sumAll = data && data?.reduce((total, item) => total + (item?.pageViews || 0), 0);
    const dataWithPercent = data && data?.map(item => {
        return { ...item, percent: ((item?.pageViews || 0) / sumAll), uniquePercent: ((item?.uniqueVisits || 0) / sumAll) };
    });
    const modifiedData = dataWithPercent;

    return (
        <div className="h-40 m-4 bg-white bg-opacity-50 rounded-md select-none">
            <div className="flex flex-row w-full h-full gap-1 p-4 justify-evenly">
                {!modifiedData && <div className="flex items-center"> <Spinner size={64} /> </div> }
                {modifiedData && modifiedData.map((item, i) => {

                    const len = modifiedData.length;
                    const hide = (len === 7 || len === 12 || len === 11) ? false : len > 30 ? i % 4 !== 0 : i % 2 !== 0;

                    // if (!item.pageViews) return(<div key={i} className="flex-grow"></div>);
                    return (
                        <div key={i} className="flex-grow bar">
                            {/* { item.pageViews > 0 || item.pageViews === 0  ? <Tooltip
                                position="bottom-center"
                                delay={50}
                                className="relative block px-3 py-2 text-sm text-gray-100 bg-gray-800 rounded shadow-xl opacity-90 font-body"
                                content={<div className="flex flex-col items-center text-xs">
                                    <span className="mb-1 font-bold">{item.label}</span>
                                    <span>{item.uniqueVisits} unique visitors</span>
                                    <span>{item.pageViews} total views</span>
                                    </div>}>
                                <div className="h-full cursor-pointer opacity-80 hover:opacity-100">
                                    <Bar value={item.percent} inPercent={true} horizontal={false} />
                                    <div className="flex justify-center py-2 text-xs font-bold text-gray-800">
                                        {!hide && item.label}
                                    </div>
                                </div>
                            </Tooltip> :  */}
                            <div className="h-full opacity-70">
                                <Bar value={0} inPercent={true} horizontal={false} />
                                <div className="flex justify-center py-2 text-xs font-bold text-gray-800">
                                    {!hide && item.label}
                                </div>
                            </div>
                            {/* } */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HorizontalBarChart;