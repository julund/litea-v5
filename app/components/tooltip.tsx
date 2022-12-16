import { motion } from "framer-motion";
import {
    // useEffect,
    useState
} from "react";
import { useEvent, useToggle } from "react-use";

// type TooltipPosition = "top-center" | "bottom-center" | "center-left" | "center-right";
type TooltipElement = { content?: string | null; x: number; y: number; h: number; w: number; delay: number }

const Tooltip = () => {

    const [tooltip, setTooltip] = useState<TooltipElement | null>(null);
    const [show, toggle] = useToggle(false);

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {

        const content = e.target?.getAttribute("data-tooltip");
        // const position = (e.target?.getAttribute("data-tooltip-position") || "top-center") as TooltipPosition;
        const delay = (Number(e.target?.getAttribute("data-tooltip-delay")) || 250) / 1000;

        const el = e.target?.getBoundingClientRect();
        const body = document.body.getBoundingClientRect();
        const { x, y } = el ? { x: el.x - body.x, y: (el.y - body.y) + el.height } : { x: 0, y: 0 };
        const { h, w } = el ? { h: el.height, w: el.width } : { h: 0, w: 0 };


        if (content) {
            toggle(true);
            setTooltip({ content, x, y, h, w, delay });
        } else {
            toggle(false);
            setTooltip({ content: null, x, y, h, w, delay });
        };
        // toggle(!!(content));
        // setTooltip({ content, x, y, h, w, delay });

    };

    // useEffect(() => console.log(show, element), [show, element]);

    useEvent("mouseover", handleMouseOver);

            // className="flex flex-col items-end justify-center bg-red-400/10 absolute pointer-events-none overflow-visible"
    return (
        <>
            {tooltip && <motion.div
                layout="preserve-aspect"
                key="tooltip"
                className="absolute left-0 top-0 px-3 py-2 text-xs font-light rounded-sm pointer-events-none bg-opacity-90 bg-base-800 text-base-100 max-w-xs"
                initial={{ opacity: 0, x: tooltip?.x, y: tooltip?.y, scale: 0.5 }}
                // initial={false}
                animate={{ opacity: show ? 1 : 0, x: tooltip?.x, y: tooltip?.y, scale: show ? 1 : 0.5 }}
                transition={{ duration: 0.3, delay: show ? tooltip.delay : 0 }}
            >
                {/* <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: element.content || " " }} /> */}
                {tooltip.content}
            </motion.div>}
            </>
    );
};

export default Tooltip;