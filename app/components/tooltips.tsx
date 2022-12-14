import { type ForwardedRef, forwardRef, useState } from "react";
import {
    useEvent,
    // useMeasure
} from "react-use";
import { AnimatePresence, motion } from "framer-motion";

// TODO: Rework everything

type TooltipElement = { ts: number; content: string | null; x: number; y: number; position: Position }

// eslint-disable-next-line react/display-name
const Tooltip = forwardRef(({ element, delay, ...props }: { element: TooltipElement, delay?: number } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {

    const { content, x, y } = element;

    return (
        <motion.div
            ref={ref}
            className="absolute top-0 left-0 z-50 px-3 py-2 text-xs font-light rounded-sm pointer-events-none bg-opacity-90 bg-base-800 text-base-100 max-w-xs"
            initial={{ opacity: 0, x, y, scale: 0.85 }}
            animate={{ opacity: 1, x, y, scale: 1 }}
            exit={{ opacity: 0, x, y, scale: 0.75, transition: { delay: 0 } }}
            transition={{ delay: delay }}
        >
            <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: content || " " }} />
            {/* {content} */}
        </motion.div>
    );

});

type Position = "top-center" | "bottom-center" | "center-left" | "center-right";

const positions = (position: Position, target: HTMLElement, width: number, height: number) => {
    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = target;
    const fns = {
        x: {
            left: offsetLeft - width,
            center: offsetLeft + (offsetWidth / 2) - (width / 2),
            right: offsetLeft + offsetWidth,
        },
        y: {
            top: offsetTop - (height * 2),
            center: offsetTop + (offsetHeight / 2) - (height),
            bottom: offsetTop + offsetHeight,
        }
    };
    switch (position) {
        case "top-center":
            return { x: fns.x.center, y: fns.y.top };
        case "bottom-center":
            return { x: fns.x.center, y: fns.y.bottom };
        case "center-left":
            return { x: fns.x.left, y: fns.y.center };
        case "center-right":
            return { x: fns.x.right, y: fns.y.center };
        default:
            return { x: 0, y: 0 };
    }
};

// function coordsFromOffset({ target, width, height, position }: {
//     target: HTMLElement;
//     width: number;
//     height: number;
//     position: Position;
// }) {
//     // const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = target;
//     // console.log({offsetHeight, offsetTop});
//     // console.log({offsetWidth, offsetLeft});
//     // console.log({width, height});

//     // const padding = 10;

//     // const leftX = offsetLeft - width;
//     // const rightX = offsetLeft + offsetWidth;
//     // const centerX = offsetLeft + (offsetWidth / 2) - (width / 2);
//     // const centerY = offsetTop + (offsetHeight / 2) - (height);
//     // const topY = offsetTop - (height * 2);
//     // const bottomY = offsetTop + offsetHeight;

//     const { x, y } = positions(position, target, width, height);

//     return { x, y };
// }

export const Tooltips = ({ delay = 250, defaultPosition = "top-center" }: { delay?: number; defaultPosition?: Position }) => {

    // const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure<HTMLDivElement>();
    const [elements, setElements] = useState<TooltipElement[]>([]);

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {

        const content = e.target?.getAttribute("data-tooltip");
        const position = e.target?.getAttribute("data-tooltip-position") as Position;
        const { x, y, width, height, top, right, bottom, left } = e.target.getBoundingClientRect();

        const validElements = elements.filter(element => element.ts > Date.now() + delay);
        if (content) {
            // const { x, y } = coordsFromOffset({ target: e.target, width, height, position: defaultPosition });
            const element = { ts: Date.now(), content, x, y: y + height, position: position || defaultPosition };
            setElements([...validElements, element]);
        } else {
            setElements(validElements);
        }
        // console.log(...elements);
    };

    useEvent("mouseover", handleMouseOver);

    return (
        <AnimatePresence mode="wait">
            {elements && elements.map(element => <Tooltip key={element.ts} element={element} delay={delay / 1000} />)}
        </AnimatePresence>
    );

};