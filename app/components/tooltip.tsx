import { useState } from "react";
import { useEvent, useMeasure } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

function coordsFromOffset({ element, width, height, position = "top-center" }: {
    element: HTMLElement;
    width: number;
    height: number;
    position?: "top-center" | "top-left";
}) {
    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = element;
    // console.log({offsetHeight, offsetTop, height});
    // console.log({offsetWidth, offsetLeft, width});
    // console.log({width, height});

    // const padding = 10;

    const centerX = offsetLeft + (offsetWidth / 2) - (width / 2); // + padding;
    // const centerY = offsetTop + offsetHeight - (elementHeight / 2) - (height / 2) + padding;

    const topY = offsetTop - (height * 2);
    const bottomY = offsetTop + offsetHeight;

    return { x: centerX, y: topY };
}

export const Tooltip = () => {

    const [ref, { width, height }] = useMeasure<HTMLDivElement>();
    const [state, setState] = useState<{ content: string | null; x: number; y: number }>({ content: null, x: 0, y: 0 });
    const delay = 500;

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {
        const content = e.target?.getAttribute("data-tooltip");
        if (content) {
            // const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = e.target;
            const { x, y } = coordsFromOffset({ element: e.target, width: width || 100, height: height || 20 });
            // const x = offsetLeft + offsetWidth + 10;
            // const y = offsetTop + (offsetHeight / 2) - 10;
            setState({ content, x, y });
        } else {
            if (state.content) setState({ content: null, x: 0, y: 0 });
        }
    };

    useEvent("mouseover", handleMouseOver);

    // return <div className="bg-base-800 text-base-100">{content}</div>;
    return (
        <AnimatePresence mode="wait">
            {state.content && <motion.div
                ref={ref}
                className="tooltip"
                initial={{ opacity: 0, x: state.x, y: state.y, scale: 0 }}
                animate={{ opacity: 1, x: state.x, y: state.y, scale: 1, transition: { delay: delay / 1000 } }}
                exit={{ opacity: 0, x: state.x, y: state.y, scale: 0, transition: { delay: 0 } }}
                transition={{ opacity: { duration: 0.1 } }}
            >
                {/* <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: state?.content }} /> */}
                {state?.content}
            </motion.div>}
        </AnimatePresence>
    );

};