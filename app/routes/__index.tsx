import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { WebsiteLayout } from "~/layout";
import { check } from "~/lib/auth.server";
import { Message } from "~/components/message";
import { type ISession } from '~/lib/session.server';
import Header from "~/layout/website/header";

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const { data, message, headers } = await check(request);
  return json({ data, message }, { headers });
};

export default function Index() {

  const { data, message } = useLoaderData<ISession>();

  return (
    <WebsiteLayout>
      <Header data={data}/>
      {/* <Message message={{ type: "info", text: "Optio molestiae at minima architecto aut temporibus accusantium eaque id iure saepe." }} duration={5000} /> */}
      {message && <Message message={message} duration={5000} />}
      <main className="max-w-4xl px-4 py-2 mx-auto grow">
        <Outlet />
      </main>
    </WebsiteLayout>
  );
}
