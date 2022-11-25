import { IconDashboard } from "~/components/icons";
import { Link, SiteNavLink } from "~/components/link";
import Logo from "~/components/logo";
import { type IData } from './../../lib/session.server';

const Header = ({ data }: { data: IData | null }) => {
    return (
        <header className="sticky top-0 z-10 flex-grow-0 w-full bg-base-50">
            <nav className="flex gap-2 items-center px-4 py-8 w-full shrink">
                <div className="flex items-center grow">
                    <Logo to="/" />
                </div>
                <div className="flex items-center shrink">
                    <SiteNavLink to="/features" className="nav-link">Features</SiteNavLink>
                    <SiteNavLink to="/pricing" className="nav-link">Pricing</SiteNavLink>
                    <SiteNavLink to="/docs" className="nav-link">Docs</SiteNavLink>
                   
                </div>
                <div className="flex gap-2 items-center shrink">
                     {data ?
                        <Link to="/dashboard" className="button button-ghost"><IconDashboard className="text-base-400"/>Dashboard</Link> :
                       <>
                       <Link to="/login" className="button button-base-light">Log in</Link>
                       <Link to="/start" className="button button-primary">Get started</Link>
                       </>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;