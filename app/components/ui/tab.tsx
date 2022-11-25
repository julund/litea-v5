import { Children, cloneElement } from "react";
import { useCounter } from "react-use";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Tab = ({ title, titles, children, className, chevronStyle = false, ...props }: { title?: string; titles?: string[], className?: string; children: React.ReactNode, chevronStyle?: boolean, props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {

    const items = Children.toArray(children);

    const min = 1;
    const max = items.length;
    if (titles && titles.length !== max) throw new Error("titles must be an array with the same length as the number of children.");
    const [current, { inc, dec, set }] = useCounter(min, max, min);

    if(typeof items !== "object") return null;

    return (
        <div className="p-4 m-2 bg-gray-50" {...props}>
            {title && <h3 className="text-base text-gray-500">{title}</h3>}
            <span className="flex flex-row items-center mb-2">
                {!chevronStyle ?
                    <span className="flex flex-row flex-wrap flex-shrink gap-2">
                        {titles && titles.map((title, index) =>
                            <span key={index} className="mb-2 text-sm">
                                {(current - 1) == index ?
                                    <span className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md select-none">{title} </span> :
                                    <button className="px-4 py-2 text-gray-900 bg-gray-200 rounded-md transition-all duration-300 select-none hover:bg-gray-300 hover:text-black" onClick={() => set(index + 1)}>{title}</button>
                                }
                            </span>
                        )}
                    </span> :
                    <>
                        <span className="flex-grow text-sm font-bold text-gray-900">
                            {titles && titles[current - 1]}
                        </span>
                        {max > 1 &&
                            <span className="flex flex-row flex-shrink select-none">
                                {current > min ?
                                    <button className="select-none active:scale-90 active:text-blue-900" onClick={() => dec()}><HiChevronLeft size={30} /></button> :
                                    <HiChevronLeft className="text-gray-400" size={30} />}
                                {current < max ?
                                    <button className="select-none active:scale-90 active:text-blue-900" onClick={() => inc()}><HiChevronRight size={30} /></button> :
                                    <HiChevronRight className="text-gray-400" size={30} />}
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