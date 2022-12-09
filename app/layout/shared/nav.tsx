import { useToggle, useMeasure, useClickAway } from "react-use";
import { IconMenu, IconX } from "~/components/icons";
import Brand from "~/components/brand";
import { classNames } from "~/utils/helpers";
import { Link } from "~/components/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Nav = ({ children,
    forceToggle = false, absolute = false, buttonContent,
    className = "flex items-start w-full gap-2 shrink p-8", 
    toggleClassName,
}: { children?: React.ReactNode; forceToggle?: boolean; absolute?: boolean; buttonContent?: Function; className?: string; toggleClassName?: string; }) => {

    const [ref, { width }] = useMeasure<HTMLElement>();
    const navToggleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const showToggle = forceToggle || width <= 704;
    const [expanded, toggle] = useToggle(false);

    useClickAway(navToggleRef, (event: Event & { target: HTMLButtonElement }) => {
        const buttonClicked = event.target === buttonRef.current;
        if (showToggle && expanded && !buttonClicked) toggle(false);
    });

    const handleNavToggleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }) => {
        const isNavigationElement = event.target.tagName === "A" || event.target.tagName === "BUTTON";
        if ((event.target !== navToggleRef.current) && isNavigationElement) toggle();
    };

    if (!buttonContent) buttonContent = (expanded: boolean) => !expanded ? <IconMenu size={22} className="text-base-400" /> : <IconX size={22} className="text-base-400" />;

    return (
        <nav ref={ref} className={classNames(className,(!showToggle) ? "flex-row" : "flex-col")}>
            <div className={classNames("flex grow",
                showToggle && "justify-between w-full ")}>
                <Link to="/" className="inline-flex p-2 select-none">
                    <Brand />
                </Link>
                {!!children && showToggle && <button ref={buttonRef} aria-label="nav-toggle" onClick={() => showToggle && toggle()} className="justify-end button button-ghost">
                    <span className="pointer-events-none">{buttonContent(expanded)}</span>
                </button>}
            </div>
            {!!children && <div
                className="relative top-0 right-0 z-50 flex flex-col w-full gap-2 md:flex-row-reverse"
            >
                <AnimatePresence>
                    {(!(!expanded && showToggle) || !showToggle) &&
                        <motion.div aria-labelledby="nav-toggle" aria-expanded={expanded} className={classNames(
                            "flex shrink gap-2 justify-end w-full",
                            absolute ? "absolute" : "relative",
                            (!expanded && showToggle) ? "flex-row" : showToggle && "flex-col"
                        )}
                            key="nav"
                            layout
                            initial={{ opacity: 0, scale: 0.35 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.35 }}
                            transition={{ type: "tween", duration: 0.15 }}
                        >
                            <div
                                ref={navToggleRef}
                                className={toggleClassName}
                                onClick={handleNavToggleClick}
                            >
                                {children}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>}
        </nav>
    );
};

export default Nav;