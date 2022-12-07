import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle, useClickAway } from "react-use";

export const Dialog = ({ children, toggleButton = "open dialog", buttons = "ok|cancel", title, onSubmit }: {
    children: React.ReactNode;
    toggleButton?: JSX.Element | string,
    buttons?: "ok|cancel" | "close" | "dismiss";
    title?: string;
    onSubmit?: (value: string | null | undefined) => void;
}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [show, toggle] = useToggle(false);

    useClickAway(ref, toggle);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> & { nativeEvent: SubmitEvent }) => {
        const value = e.nativeEvent.submitter?.getAttribute("value");
        onSubmit && onSubmit(value);
        toggle();
    };

    return (
        <>
            <button onClick={toggle}>{toggleButton}</button>
            <AnimatePresence>
                {show &&
                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 p-8">
                        <motion.div
                            className="fixed inset-0 z-0 bg-opacity-40 bg-base-800"
                            key="modalbg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            ref={ref}
                            className="z-50 max-w-xl p-4 rounded-sm bg-base-100"
                            key="modalbox"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ opacity: { duration: 0.25 } }}
                        >
                            {title && <h3 className="text-xl font-semibold text-base-800 font-title">{title}</h3>}
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                {children}
                            </div>
                            <hr className="my-4" />
                            <form method="dialog" className="flex justify-end gap-2" onSubmit={handleSubmit}>
                                {
                                    buttons === "ok|cancel" ?
                                        <>
                                            <button value="ok" className="button button-primary">OK</button>
                                            <button value="cancel" className="button button-ghost">Cancel</button>
                                        </>
                                        :
                                        buttons === "close" ?
                                            <button value="close" className="button button-ghost">Close</button>
                                            :
                                            <button value="dismiss" className="button button-ghost">Dismiss</button>
                                }
                            </form>
                        </motion.div>
                    </div>}
            </AnimatePresence>
        </>
    );
};