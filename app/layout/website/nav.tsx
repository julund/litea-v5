import { useToggle } from "react-use";
import { IconDashboard, IconMenu, IconX } from "~/components/icons";
import { Link, SiteNavLink } from "~/components/link";
import Logo from "~/components/logo";
import { classNames } from "~/utils/helpers";
import { type IData } from '../../lib/session.server';

const Nav = ({ data }: { data?: IData | null }) => {

    const [expanded, toggle] = useToggle(false);

    return (
        <nav className="flex items-center w-full gap-2 p-8 shrink">
            <div className="flex items-center grow">
                <Logo to="/" />
            </div>
            <div className="flex md:flex-row flex-col-reverse gap-2">
                <div aria-labelledby="nav-toggle" aria-expanded={expanded} className={classNames("flex flex-col md:flex-row items-center shrink gap-2", !expanded && "hidden")}>
                    <SiteNavLink to="/features" className="nav-link">Features</SiteNavLink>
                    <SiteNavLink to="/pricing" className="nav-link">Pricing</SiteNavLink>
                    <SiteNavLink to="/docs" className="nav-link">Docs</SiteNavLink>
                    {data ?
                        <Link to="/dashboard" className="button button-ghost"><IconDashboard className="text-base-400" />Dashboard</Link> :
                        <>
                            <Link to="/start" className="button button-primary">Get started</Link>
                            <Link to="/login" className="button button-base-light">Log in</Link>
                        </>
                    }
                </div>
                <button aria-label="nav-toggle" onClick={toggle} className="button button-ghost self-end">
                    {!expanded ? <IconMenu size={22} /> : <IconX size={22} />}
                </button>
            </div>

        </nav>
    );
};

export default Nav;