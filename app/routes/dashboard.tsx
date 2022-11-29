import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Outlet, type ShouldReloadFunction } from "@remix-run/react";
import { DashboardLayout } from "~/layout";
import { check } from "~/lib/auth.server";
import { Message } from "~/components/message";
import { type ISession } from "~/lib/session.server";
import { IconLogout, IconSettings, IconUser } from "~/components/icons";
import { NavLink } from "~/components/link";
import Logo from "~/components/logo";
// import Breadcrumbs from "~/components/breadcrumbs";

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
      <header className="sticky top-0 z-10 flex w-full p-8 bg-white">
        <nav className="flex gap-2 grow">
          <Logo to="/dashboard" />
        </nav>
        <nav className="flex items-center justify-end gap-2 shrink">
          <div className="flex gap-2 py-2 items-centerpx-4 text-base-500"><IconUser />{data?.handle}</div>
          <NavLink to="/dashboard/account"><IconSettings size={22} />Account</NavLink>
          <NavLink to="/logout"><IconLogout />Log out</NavLink>
        </nav>
      </header>
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