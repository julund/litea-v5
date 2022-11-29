import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Outlet, type ShouldReloadFunction } from "@remix-run/react";
import { DashboardLayout } from "~/layout";
import { check } from "~/lib/auth.server";
import { Message } from "~/components/message";
import { type ISession } from "~/lib/session.server";
import { IconChevronLeft, IconChevronRight, IconLogout, IconSettings, IconUser, IconWorld } from "~/components/icons";
import { Link, NavLink } from "~/components/link";
import Logo from "~/components/logo";
// import Breadcrumbs from "~/components/breadcrumbs";
import { useState } from 'react';
import { classNames } from '~/utils/helpers';

export const unstable_shouldReload: ShouldReloadFunction = () => false;

export const handle = { title: "Dashboard" };

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const { data, message, headers } = await check(request, "/login");
  // const { data, message, headers } = await check(request);
  return json({ data, message }, { headers });

};

export default function Dashboard() {

  const { data, message } = useLoaderData<ISession>();

  const [collapsed, setCollapsed] = useState(false);

  const navClasses = classNames("absolute top-0 z-30 flex flex-col w-screen h-screen max-h-screen gap-2 md:sticky bg-base-100 shrink", collapsed ? 
  "md:w-20 px-4 py-2" :
  "md:w-72 px-6 py-4")

  return (
    <DashboardLayout>
      <nav className={navClasses}>
        <div className="flex">
          <span className="grow"><Logo to="/" hidetitle={collapsed} /></span>
          <button className="shrink" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <IconChevronRight/>: <IconChevronLeft/>}</button>
        </div>
        <NavLink to="/dashboard">
          <IconWorld size={22}/>
          <span className={collapsed ? "invisible" : ""}>Sites</span>
        </NavLink>
        <NavLink to="/dashboard/account">
          <IconSettings size={22}/>
          <span className={collapsed ? "invisible" : ""}>Account</span>
          </NavLink>
        <div className="flex flex-col justify-end gap-2 grow">
          <div className="flex gap-2 py-2 items-centerpx-4 text-base-500"><IconUser />{data?.handle}</div>
          <Link to="/logout" className="button button-primary"><IconLogout />Log out</Link>
        </div>
      </nav>
      <main className="grow">
        {/* <nav className="flex items-center justify-end w-full gap-4 px-6 py-4 border-b-2 bg-white/50 border-base-100">
          <Breadcrumbs />
        </nav> */}
        {/* <Message message={{ type: "info", text: "Optio molestiae at minima architecto aut temporibus accusantium eaque id iure saepe." }} duration={5000} /> */}
        {message && <Message message={message} />}
        <Outlet />
      </main>

    </DashboardLayout>
  );
}