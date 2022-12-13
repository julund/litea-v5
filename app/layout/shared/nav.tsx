import { useToggle, useMeasure, useClickAway } from "react-use";
// import { IconMenu, IconX } from "~/components/icons";
import Brand from "~/components/brand";
import { classNames } from "~/utils/helpers";
import { Link } from "~/components/link";
import { useRef } from "react";
import DropDown from "~/components/dropDown";

const Nav = ({ children }: { children?: React.ReactNode; }) => {

    const [ref, { width }] = useMeasure<HTMLElement>();
    const [firstRef, { width: firstWidth }] = useMeasure<HTMLSpanElement>();
    const [secondRef, { width: secondWidth }] = useMeasure<HTMLDivElement>();
    const navToggleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const showDropDown = width <= (firstWidth + secondWidth);
    const [expanded, toggle] = useToggle(false);

    useClickAway(navToggleRef, (event: Event & { target: HTMLButtonElement }) => {
        const buttonClicked = event.target === buttonRef.current;
        if (showDropDown && expanded && !buttonClicked) toggle(false);
    });

    return (
        <nav ref={ref} className={classNames("flex items-start w-full gap-2 p-8", showDropDown && "flex-col")}>
            <div className={classNames("flex shrink", showDropDown && "justify-between w-full items-center")}>
                <span ref={firstRef}>
                    <Link to="/" className="inline-flex p-2 select-none">
                        <Brand />
                    </Link>
                </span>
                {showDropDown &&
                    <DropDown config={{ toggleStyle: "menu" }}>
                        {children}
                    </DropDown>
                }
            </div>
            {!showDropDown &&
                <div ref={secondRef} className="flex flex-row gap-2 grow justify-end">
                    {children}
                </div>
            }
        </nav>
    );
};

export default Nav;