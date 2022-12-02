import { useToggle, useMeasure } from "react-use";
import { IconMenu, IconX } from "~/components/icons";
import Brand from "~/components/brand";
import { classNames } from "~/utils/helpers";
import { Link } from "~/components/link";
import { useRef } from "react";

const Nav = ({ children }: { children?: React.ReactNode; }) => {

    const [ref, { width }] = useMeasure<HTMLElement>();
    const navToggleRef = useRef<HTMLDivElement>(null);
    const showToggle = width <= 704;
    const [expanded, toggle] = useToggle(false);

    return (
        <nav ref={ref} className={classNames("z-30 flex items-start w-full gap-2 p-8 shrink",
            (!showToggle) ? "flex-row" : "flex-col"
        )}>
            <div className={classNames("flex grow", 
                showToggle && "justify-between w-full ")}>
                <Link to="/" className="inline-flex p-2 select-none">
                    <Brand />
                </Link>
                {!!children && showToggle && <button aria-label="nav-toggle" onClick={toggle} className="justify-end button button-ghost">
                    {!expanded ? <IconMenu size={22} /> : <IconX size={22} />}
                </button>}
            </div>
            {!!children && <div className="relative top-0 right-0 flex flex-col w-full gap-2 md:flex-row-reverse">
                <div ref={navToggleRef} aria-labelledby="nav-toggle" aria-expanded={expanded} onClick={(e) => (e.target !== navToggleRef.current) && toggle() } className={classNames(
                    "relative flex items-start shrink gap-2",
                    (!expanded && showToggle) ? "flex-row hidden" : showToggle && "flex-col p-4 w-full items-center"
                )}>
                    {children}
                </div>
            </div>}

        </nav>
    );
};

export default Nav;