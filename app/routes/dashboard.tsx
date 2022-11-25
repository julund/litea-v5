import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Outlet, type ShouldReloadFunction } from "@remix-run/react";
import { DashboardLayout } from "~/layout";
import { check } from "~/lib/auth.server";
import { Message } from "~/components/message";
import { type ISession } from "~/lib/session.server";
import { IconLogout, IconUser } from "~/components/icons";
import { Link, NavLink } from "~/components/link";
import Logo from "~/components/logo";
import Breadcrumbs from "~/components/breadcrumbs";

export const unstable_shouldReload: ShouldReloadFunction = () => false;

export const handle = { title: "Dashboard" };

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const { data, message, headers } = await check(request, "/login");
  // const { data, message, headers } = await check(request);
  return json({ data, message }, { headers });

};

export default function Dashboard() {

  const { data, message } = useLoaderData<ISession>();

  return (
    <DashboardLayout>

      <nav className="flex flex-col gap-2 px-6 py-4 w-72 bg-base-100 shrink">
        <Logo to="/" />
        <NavLink to="/dashboard" className="button button-ghost">Sites</NavLink>
        <NavLink to="/dashboard/account" className="button button-ghost">Account</NavLink>
        <div className="flex flex-col gap-2 justify-end grow">
          <div className="flex gap-2 py-2 items-centerpx-4 text-base-500"><IconUser />{data?.handle}</div>
          <Link to="/logout" className="button button-primary"><IconLogout />Log out</Link>
        </div>

      </nav>
      <main className="grow">
        {/* <nav className="flex gap-4 justify-end items-center px-6 py-4 w-full border-b-2 bg-white/50 border-base-100">
          <Breadcrumbs />
        </nav> */}
        {/* <Message message={{ type: "info", text: "Optio molestiae at minima architecto aut temporibus accusantium eaque id iure saepe." }} duration={5000} /> */}
        {message && <Message message={message} />}
        <Outlet />
      </main>

    </DashboardLayout>
  );
}