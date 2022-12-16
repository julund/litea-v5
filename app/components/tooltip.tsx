import { AnimatePresence, motion } from "framer-motion";
import {
    // useEffect,
    useState
} from "react";
import { useEvent, useToggle } from "react-use";

// type TooltipPosition = "top-center" | "bottom-center" | "center-left" | "center-right";
type TooltipElement = { content?: string | null; x: number; y: number; cx: number; cy: number; delay: number }

const Tooltip = () => {

    const [element, setElement] = useState<TooltipElement | null>(null);
    const [show, toggle] = useToggle(false);

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {

        const content = e.target?.getAttribute("data-tooltip");
        // const position = (e.target?.getAttribute("data-tooltip-position") || "top-center") as TooltipPosition;
        const delay = (Number(e.target?.getAttribute("data-tooltip-delay")) || 500) / 1000;

        const el = e.target?.getBoundingClientRect();
        const body = document.body.getBoundingClientRect();
        const { x, y } = el ? { x: el.x - body.x, y: (el.y - body.y) + el.height } : { x: 0, y: 0 };
        const { cx, cy } = el ? { cx: el.height, cy: el.width } : { cx: 0, cy: 0 };

        if (content) {
            toggle(true);
            setElement({ content, x, y, cx, cy, delay });
        } else {
            toggle(false);
        };
        // toggle(!!(content));
        // setElement({ content, x, y, delay });

    };

    // useEffect(() => console.log(show, element), [show, element]);

    useEvent("mouseover", handleMouseOver);

    return (
        <AnimatePresence mode="wait">
            {element?.content && <motion.div
                layout="preserve-aspect"
                key="tooltip"
                className="absolute top-0 left-0 z-50 px-3 py-2 text-xs font-light rounded-sm pointer-events-none bg-opacity-90 bg-base-800 text-base-100 max-w-xs"
                // initial={{ opacity: 0, x: element.cx, y: element.cy, scale: 0 }}
                // animate={{ opacity: 1, x: element.x, y: element.y, scale: show ? 1 : 0 }}
                style={{ x: element.x, y: element.y }}
                initial={false}
                animate={{ opacity: show ? 1: 0, scale: show ? 1 : 0.75, y: show ? element.y : element.y + 10 }}
                transition={{ duration: 0.25, delay: show ? element.delay : 0 }}
            >
                {/* <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: element.content || " " }} /> */}
                {element.content}
            </motion.div>}
        </AnimatePresence>
    );
};

export default Tooltip;