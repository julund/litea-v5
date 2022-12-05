import Icon from "../icon";
import Circle from "../ui/circle";

interface ChartData {
    title: string;
    value: number;
}
export default function BubbleChart({ title, data }: { title: string; data?: ChartData[] }) {

    const sumAll = data?.reduce((total, item) => total + (item?.value || 0), 0) || 0;
    const dataWithPercent = data && data?.map(item => ({ ...item, percent: ((item?.value || 0) / sumAll) }));
    data = dataWithPercent;
    return (
        <div>
            <h3>{title}</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {data ?
                    data.map(item => {
                        const size = Math.min(Math.max(item.value * 10,38),82);
                        return (
                            <Circle key={item.title} size={size}>
                                <Icon title={item.title} category={title} className="w-full h-full stroke-1 text-base-600" />
                            </Circle>
                        );
                    }) :
                    <p>No data.</p>
                }
            </div>
        </div>
    );
}