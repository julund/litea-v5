import { IconLogout, IconSettings, IconUser } from "~/components/icons";
import { NavLink } from "~/components/link";
import Logo from "~/components/logo";
import { type IData } from "../../lib/session.server";

const Nav = ({ data }: { data?: IData | null }) => {

    return (
        <nav className="flex items-center w-full gap-2 p-8 shrink">
            <div className="flex gap-2 grow">
                <Logo to="/dashboard" />
            </div>
            <div className="flex items-center justify-end gap-2 shrink">
                <div className="flex gap-2 py-2 items-centerpx-4 text-base-500"><IconUser />{data?.handle}</div>
                <NavLink to="/dashboard/account"><IconSettings size={22} />Account</NavLink>
                <NavLink to="/logout"><IconLogout />Log out</NavLink>
            </div>
        </nav>
    );
    
};

export default Nav;