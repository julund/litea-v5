import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type IMessage } from "~/lib/session.server";
import { classNames } from "~/utils/helpers";
import { IconX } from "./icons";

export const Message = ({ message, duration, allowClose = true }: { message?: IMessage | null; duration?: number; allowClose?: boolean }) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (duration) {
            const t = setTimeout(() => setVisible(false), duration);
            return () => clearInterval(t);
        }
    }, [duration]);

    if (!message) return null;

    const classes = classNames(
        "sticky top-0 z-0 message flex justify-center",
        message.type === "error" && "message-error",
        message.type === "info" && "message-info",
        message.type === "success" && "message-success",
        message.type === "warning" && "message-warning",
    );

    return (
        <AnimatePresence mode="popLayout">
            {visible && (
                <motion.div
                    layout
                    layoutId="messages"
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
    );

};