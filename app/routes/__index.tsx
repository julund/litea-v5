import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import WebsiteLayout from "~/layout/website";
import { check } from "~/lib/auth.server";
import { type ISession } from "~/lib/session.server";

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const { data, message, headers } = await check(request);
  return json({ data, message }, { headers });
};

export default function Index() {

  const session = useLoaderData<ISession>();

  return (
    <WebsiteLayout session={session}>
        <Outlet />
    </WebsiteLayout>
  );
  
}