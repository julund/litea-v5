import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, motion } from "~/lib/motion";
import { type IMessage } from "~/lib/session.server";
import { classNames } from "~/utils/helpers";
import { IconX } from "./icons";

const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation);

export const Message = ({ message, duration, allowClose = true }: { message: IMessage; duration?: number; allowClose?: boolean }) => {
    
    const classes = classNames(
        "sticky top-0 z-50 message flex justify-center",
        message.type === "error" && "message-error",
        message.type === "info" && "message-info",
        message.type === "success" && "message-success",
        message.type === "warning" && "message-warning",
    );
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (duration) {
            const t = setTimeout(() => setVisible(false), duration);
            return () => clearInterval(t);
        }
    }, [duration]);

    return (
        <LazyMotion features={loadFeatures}>
        <AnimatePresence>
            {visible && (
                <motion.div
                    layout
                    className={classes}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="grow">{message.text}</span>
                    {allowClose && <button onClick={() => setVisible(false)} className="flex items-center gap-1 text-sm shrink hover:text-primary-700"><IconX /></button>}
                </motion.div>
            )}
        </AnimatePresence>
        </LazyMotion>
    );
    
};