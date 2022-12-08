import { useState } from "react";
import { useEvent } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

export const Tooltip = () => {

    const [state, setState] = useState<{ content: string | null; x: number; y: number }>({ content: null, x: 0, y: 0 });
    const delay = 0.5;

    const handleMouseOver = (e: Event & { target: HTMLElement }) => {
        const content = e.target?.getAttribute("data-tooltip");
        if (content) {
            const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = e.target;
            const x = offsetLeft + offsetWidth + 10;
            const y = offsetTop + (offsetHeight / 2) - 10;
            setState({ content, x, y });
        } else {
            if (state.content) setState({ content: null, x: 0, y: 0 });
        };
    };

    useEvent("mouseover", handleMouseOver);

    // return <div className="bg-base-800 text-base-100">{content}</div>;
    return (
        <AnimatePresence mode="wait">
            {state.content && <motion.div
                className="absolute z-50 top-0 left-0 px-3 py-2 text-sm font-light rounded-sm pointer-events-none bg-opacity-90 bg-base-800 text-base-100 w-fit"
                initial={{ opacity: 0, x: state.x - 50, y: state.y, scale: 0 }}
                animate={{ opacity: 1, x: state.x, y: state.y, scale: 1, transition: { delay: delay } }}
                exit={{ opacity: 0, x: state.x - 50, y: state.y, scale: 0, transition: { delay: 0 } }}
            >
                {/* <span data-id="tooltip" dangerouslySetInnerHTML={{ __html: state?.content }} /> */}
                {state?.content}
            </motion.div>}
        </AnimatePresence>
    );

};