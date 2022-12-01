import { Children, cloneElement } from "react";
import { useCounter } from "react-use";
import { IconChevronLeft, IconChevronRight } from "~/components/icons";

const Tab = ({ title, titles, children, chevronStyle = false, ...props }: { title?: string; titles?: string[], children: React.ReactNode, chevronStyle?: boolean, props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {

    const items = Children.toArray(children).filter(e=> typeof e === "object") as React.ReactElement[];

    const min = 1;
    const max = items.length;
    if (titles && titles.length !== max) throw new Error("titles must be an array with the same length as the number of children.");
    const [current, { inc, dec, set }] = useCounter(min, max, min);

    return (
        <div className="min-h-[288px] p-4 bg-white" {...props}>
            {title && <h3 className="pb-2 text-base text-base-500">{title}</h3>}
            <span className="flex flex-row items-center mb-2">
                {!chevronStyle ?
                    <span className="flex flex-row flex-wrap flex-shrink gap-1">
                        {titles && titles.map((title, index) =>
                            <span key={index} className="text-xs">
                                {(current - 1) == index ?
                                    <div className="px-2 py-1 rounded-sm select-none text-base-200 bg-base-600">{title} </div> :
                                    <button className="px-2 py-1 transition-all duration-300 rounded-sm select-none text-base-900 bg-base-200 hover:bg-base-300 hover:text-base-800" onClick={() => set(index + 1)}>{title}</button>
                                }
                            </span>
                        )}
                    </span> :
                    <>
                        <span className="flex-grow text-sm font-bold text-base-900">
                            {titles && titles[current - 1]}
                        </span>
                        {max > 1 &&
                            <span className="flex flex-row flex-shrink select-none">
                                {current > min ?
                                    <button className="select-none active:scale-90 active:text-primary-900" onClick={() => dec()}><IconChevronLeft size={26} /></button> :
                                    <IconChevronLeft className="text-base-400" size={26} />}
                                {current < max ?
                                    <button className="select-none active:scale-90 active:text-primary-900" onClick={() => inc()}><IconChevronRight size={26} /></button> :
                                    <IconChevronRight className="text-base-400" size={26} />}
                            </span>
                        }
                    </>}
            </span>
            {current && cloneElement(items[current - 1])}
            {/* { items.map(i => i)} */}
        </div>
    );
};

export default Tab;