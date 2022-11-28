import numbro from "numbro";
import { lowerCase } from "~/utils/helpers";
// import { useSpring, useTransition, animated, config, useTrail } from "react-spring";
import Bar from "../ui/bar";
// import Iconify from "../ui/iconify";
import { CircleFlag } from "react-circle-flags";
import FavIcon from "../favicon";

const countFormat = {
    average: true,
};

const percentFormat: numbro.Format = {
    output: "percent",
    spaceSeparated: true,
    mantissa: 0
};

const VerticalBarChart = ({ title, data }: { title: string; data: Array<any> }) => {

    const sumAll = data && data?.reduce((total, item) => total + item.count, 0);
    const dataWithPercent = data && data?.map(item => {
        return { ...item, percent: (item.count / sumAll) };
    }).sort((a, b) => (a.count > b.count) ? -1 : 1);

    const numItemsTop = 4;
    const top = (dataWithPercent && dataWithPercent?.filter((_, i) => i <= (numItemsTop - 1))) || undefined;
    const rest = dataWithPercent && dataWithPercent?.filter((_, i) => i >= numItemsTop);
    const sumRest = rest && rest?.reduce((total, item) => total + item.count, 0);
    const restItem = { name: `(${rest?.length} other ${lowerCase(title)})`, count: sumRest, percent: (sumRest / sumAll) };
    let modifiedData = sumRest > 1 ? top && [...top, restItem] : top && [...top, ...rest];
    const isEmpty = modifiedData && modifiedData.length == 0;

    // const transitions = useTransition(modifiedData, {
    //     keys: item => item.key,
    //     from: { opacity: 0 },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    //     config: config.molasses,
    // });

    // const fade = useTrail(modifiedData?.length || 0, {
    //     delay: 200,
    //     from: { opacity: 0, scale: 0 },
    //     to: { opacity: 1, scale: 1 },
    //     config: config.default,
    // });

    return (
        <div className="flex flex-col py-2">
            {/* <div className="px-4 py-1 mb-1 font-bold text-sm">{title}</div> */}
            <div className="flex-auto">
                {isEmpty &&
                    <div className="mb-2">
                        <div className="flex flex-row mb-1 justify-between items-center text-base break-all">
                            <span className="flex items-center gap-2">(none)</span>
                            <span>
                                0 <small>({numbro(1).format(percentFormat)})</small>
                            </span>
                        </div>
                        <Bar value={0} inPercent={true}/>
                    </div>
                }
                {/* {transitions((styles, item) => (
                    item && (
                    <animated.div style={styles}>
                        <div className="flex flex-row mb-2 justify-between items-center text-base break-all">
                            <span className="flex items-center gap-2"><Iconify category={title}>{item.name || "(blank)"}</Iconify></span>
                            <span>
                                {numbro(item.count).format(countFormat)} <small>({item.percent ? numbro(item.percent).format(percentFormat) : "∞ %"})</small>
                            </span>
                        </div>
                        <Bar value={item.percent} inPercent={true} />
                    </animated.div>)
                ))} */}

                {modifiedData && modifiedData.map((item, i) => {
                    return (
                        <div key={i} className="mb-2">
                            <div className="flex flex-row mb-1 justify-between items-center text-sm break-all">
                                <span className="flex items-center gap-1">
                                    {/* <Iconify category={title}>{item.name || "(blank)"}</Iconify> */}
                                    { item?.countryCode && <CircleFlag className="h-4" countryCode={item.countryCode.toLowerCase()} width="16" height="16" />}
                                    { item?.domain && <FavIcon className="h-4" alt={item.domain.toLowerCase()} domain={item.domain.toLowerCase()} />}
                                    {item.name || "(blank)"}
                                </span>
                                <span>
                                    {numbro(item.count).format(countFormat)} <small>({item.percent ? numbro(item.percent).format(percentFormat) : "∞ %"})</small>
                                </span>
                            </div>
                            <Bar value={item.percent} inPercent={true}/>
                        </div>
                    );
                })}

                {/* {fade.map((styles, index) => {
                    const item = modifiedData[index];
                    return (
                        <animated.div style={styles}>
                            <div className="flex flex-row mb-2 justify-between items-center text-base break-all">
                                <span className="flex items-center gap-2"><Iconify category={title}>{item.name || "(blank)"}</Iconify></span>
                                <span>
                                    {numbro(item.count).format(countFormat)} <small>({item.percent ? numbro(item.percent).format(percentFormat) : "∞ %"})</small>
                                </span>
                            </div>
                            <Bar value={item.percent} inPercent={true} />
                        </animated.div>)
                })} */}

            </div>
        </div>
    );
};

export default VerticalBarChart;