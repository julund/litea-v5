import { useEffect, useState } from "react";
import { type IMessage } from "~/lib/session.server";
import { classNames } from "~/utils/helpers";
import { IconX } from "./icons";

export const Message = ({ message, duration, allowClose = true }: { message: IMessage; duration?: number; allowClose?: boolean }) => {
    const classes = classNames(
        "message flex justify-center",
        message.type === "error" && "message-error",
        message.type === "info" && "message-info",
        message.type === "success" && "message-success",
        message.type === "warning" && "message-warning",
    )
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (duration) {
            const t = setTimeout(() => setVisible(false), duration)
            return () => clearInterval(t);
        }
    }, [duration])

    if (!visible) return null;
    return (
        <div className={classes}>
            <span className="grow">{message.text}</span>
            { allowClose && <button onClick={() => setVisible(false)} className="flex items-center gap-1 text-sm shrink hover:text-primary-700"><IconX /></button>}
        </div>
    );
};