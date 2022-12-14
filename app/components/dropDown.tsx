import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useClickAway, useToggle } from "react-use";
import { classNames } from "~/utils/helpers";
import { IconChevronUp, IconChevronDown, IconX, IconMenu } from "./icons";

type DropDownConfig = {
    align?: "left" | "right",
    toggleOnHover?: boolean;
    toggleStyle?: "chevron" | "menu";
    toggleClassName?: string;
    innerClassName?: string;
}
const DropDown = ({ title, config, children }: { title?: string | null; config?: DropDownConfig; children: React.ReactNode }) => {

    config = {
        align: "right",
        toggleOnHover: false,
        toggleStyle: "chevron",
        toggleClassName: "px-4 py-2 flex gap-1 items-center text-base-600",
        innerClassName: "shadow-lg shadow-base-500/50 bg-base-100 rounded-sm px-4 py-2 flex flex-col gap-2",
        ...config
    } as DropDownConfig;

    const ref = useRef<HTMLDivElement>(null);
    const [expanded, toggle] = useToggle(false);

    useClickAway(ref, (_event: Event & { target: HTMLButtonElement }) => {
        toggle(false);
    });

    const handleHover = ((nextValue?: any) => {
        config?.toggleOnHover && toggle(nextValue);
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }) => {
        const isHrefClick = !!(event.target.tagName === "A" && event.target.getAttribute("href"));
        const isHrefParentClick = event.target.parentElement && !!(event.target.parentElement.tagName === "A" && event.target.parentElement.getAttribute("href"));
        if ((event.target !== ref.current) && (isHrefClick || isHrefParentClick)) toggle();
    };

    return (
        <div ref={ref} className="relative" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <button onClick={() => !config?.toggleOnHover && toggle()} aria-label="toggle" className={config.toggleClassName}>
                {title}
                {config.toggleStyle === "chevron" && (expanded ? <IconChevronUp size={16} className="text-base-400" /> : <IconChevronDown size={16} className="text-base-400" />)}
                {config.toggleStyle === "menu" && (expanded ? <IconX size={20} className="text-base-500" /> : <IconMenu size={20} className="text-base-500" />)}
            </button>
                <motion.div
                    onClick={handleClick}
                    aria-labelledby="toggle"
                    aria-expanded={expanded}
                    initial={false}
                    animate={{
                        opacity: expanded ? 1 : 0,
                        y: expanded ? 0 : -50,
                        scale: expanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={classNames(config.innerClassName, config.align === "left" ? "left-0" : "right-0", "absolute z-50 min-w-max")}
                >
                    {children}
                </motion.div>
        </div>
    );
};

export default DropDown;