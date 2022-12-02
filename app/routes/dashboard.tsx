import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Outlet, type ShouldReloadFunction } from "@remix-run/react";
import DashboardLayout from "~/layout/dashboard";
import { check } from "~/lib/auth.server";
import { type ISession } from "~/lib/session.server";

export const unstable_shouldReload: ShouldReloadFunction = () => false;

export const handle = { title: "Dashboard" };

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {

  const { data, message, headers } = await check(request, "/login");
  return json({ data, message }, { headers });

};

export default function Dashboard() {

  const session = useLoaderData<ISession>();

  return (
    <DashboardLayout session={session}>
      <Outlet />
    </DashboardLayout>
  );

}