import { type ForwardedRef, forwardRef, useState } from "react";
import { useEvent } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

// TODO: Rework everything

type TooltipType = { ts: number; content: string | null; x: number; y: number; position: Position }

const TooltipElement = forwardRef(({ element, delay }: { element: TooltipType, delay?: number }, ref: ForwardedRef<HTMLDivElement>) => {
    const { content, x, y } = element;
    return (
        <motion.div
            ref={ref}
            className="absolute top-0 left-0 z-50 px-3 py-2 text-xs font-light rounded-sm pointer-events-none bg-opacity-90 bg-base-800 text-base-100 max-w-xs"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1, transition: { delay } }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ type: "spring", duration: 0.45, delay: 0.25 }}
        >
            {/* <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: content || " " }} /> */}
            {content}
        </motion.div>
    );
});
TooltipElement.displayName = "TooltipElement";

type Position = "top-center" | "bottom-center" | "center-left" | "center-right";

const Tooltip = ({ delay = 500, defaultPosition = "top-center" }: { delay?: number; defaultPosition?: Position }) => {

    const [elements, setElements] = useState<TooltipType[]>([]);

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {

        const content = e.target?.getAttribute("data-tooltip");
        const position = e.target?.getAttribute("data-tooltip-position") as Position;
        
        const el = e.target?.getBoundingClientRect();
        const body = document.body.getBoundingClientRect();
        const { x, y } = el ? { x: el.x - body.x, y: (el.y - body.y) + el.height } : { x: 0, y: 0 };

        const validElements = elements.filter(element => element.ts > Date.now() + delay);
        if (content) {
            const element = { ts: Date.now(), content, x, y, position: position || defaultPosition };
            setElements([...validElements, element]);
        } else {
            setElements(validElements);
        }
    };

    useEvent("mouseover", handleMouseOver);

    return (
        <AnimatePresence mode="wait">
            {elements && elements.map(element => <TooltipElement key={element.ts} element={element} delay={delay / 1000} />)}
        </AnimatePresence>
    );

};

export default Tooltip;