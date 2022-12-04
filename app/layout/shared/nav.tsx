import { useToggle, useMeasure } from "react-use";
import { IconMenu, IconX } from "~/components/icons";
import Brand from "~/components/brand";
import { classNames } from "~/utils/helpers";
import { Link } from "~/components/link";
import { useRef } from "react";

const Nav = ({ children, forceToggle = false, absolute = false, buttonContent, className = "flex flex-col gap-2 md:flex-row" }: { children?: React.ReactNode; forceToggle?: boolean; absolute?: boolean; buttonContent?: Function; className?: string }) => {

    const [ref, { width }] = useMeasure<HTMLElement>();
    const navToggleRef = useRef<HTMLDivElement>(null);
    const showToggle = forceToggle || width <= 704;
    const [expanded, toggle] = useToggle(false);

    if (!buttonContent) buttonContent = (expanded: boolean) => !expanded ? <IconMenu size={22} className="text-base-400" /> : <IconX size={22} className="text-base-400" />;

    return (
        <nav ref={ref} className={classNames("flex items-start w-full gap-2 shrink p-8",
            (!showToggle) ? "flex-row" : "flex-col"
        )}>
            <div className={classNames("flex grow",
                showToggle && "justify-between w-full ")}>
                <Link to="/" className="inline-flex p-2 select-none">
                    <Brand />
                </Link>
                {!!children && showToggle && <button aria-label="nav-toggle" onClick={toggle} className="justify-end button button-ghost">
                    {buttonContent(expanded)}
                    {/* {!expanded ? <IconMenu size={22} className="text-base-400" /> : <IconX size={22} className="text-base-400" />} */}
                </button>}
            </div>
            {!!children && <div className="relative top-0 right-0 z-50 flex flex-col w-full gap-2 md:flex-row-reverse">
                <div aria-labelledby="nav-toggle" aria-expanded={expanded} className={classNames(
                    "flex shrink gap-2",
                    absolute ? "absolute" : "relative",
                    (!expanded && showToggle) ? "flex-row hidden" : showToggle && "flex-col w-full"
                )}>
                    <div ref={navToggleRef} className={className} onClick={(e) => (e.target !== navToggleRef.current) && toggle()}>
                        {children}
                    </div>
                </div>
            </div>}

        </nav>
    );
};

export default Nav;