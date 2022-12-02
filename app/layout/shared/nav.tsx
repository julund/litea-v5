import { useToggle, useMeasure } from "react-use";
import { IconMenu, IconX } from "~/components/icons";
import Brand from "~/components/brand";
import { classNames } from "~/utils/helpers";
import { Link } from "~/components/link";

const Nav = ({ children }: { children?: React.ReactNode; }) => {

    const [ref, { width }] = useMeasure<HTMLElement>();
    const showToggle = width <= 704;
    const [expanded, toggle] = useToggle(false);

    return (
        <nav ref={ref} className="flex items-start w-full gap-2 p-8 shrink">
            <div className="flex grow">
                <Link to="/" className="inline-flex p-2 select-none">
                    <Brand />
                </Link>
            </div>
            {!!children && <div className="relative top-0 right-0 flex flex-col gap-2 md:flex-row-reverse">
                {showToggle && <button aria-label="nav-toggle" onClick={toggle} className="self-end button button-ghost">
                    {!expanded ? <IconMenu size={22} /> : <IconX size={22} />}
                </button>}
                <div aria-labelledby="nav-toggle" aria-expanded={expanded} className={classNames(
                    "relative flex flex-col md:flex-row items-start shrink gap-2 bg-base-300",
                    !expanded && showToggle && "hidden"
                )}>
                    {children}
                </div>
            </div>}

        </nav>
    );
};

export default Nav;