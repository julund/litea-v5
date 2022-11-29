import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { check, signIn } from "~/lib/auth.server";
import { Message } from "~/components/message";
import { type ISession } from "~/lib/session.server";
import { MinimalLayout } from "~/layout";
import { IconLogin } from "~/components/icons";

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const { data, message, headers } = await check(request);
  return json({ data, message }, { headers });
};

export const action: ActionFunction = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  if (email && password) await signIn(request, email, password);
}

export default function Index() {

  const { data, message } = useLoaderData<ISession>();
  const { state } = useTransition();

  return (
    <MinimalLayout>
      <div className="flex flex-col items-center gap-2 text-center">
        {message && <Message message={message} />}
        {!data?.handle && <Form id="loginForm" className="flex flex-col gap-4 py-4" method="post">
          <h1 className="py-2 text-2xl font-semibold font-title">Login</h1>
          <input className="" id="Email" type="email" name="email" placeholder="email@example.com" autoComplete="email" />
          <input className="" id="Password" type="password" name="password" autoComplete="password" />
          <p className="px-2 text-sm text-base-500">Forgot password?</p>
          <button className="button button-primary justify-center disabled:opacity-40" type="submit" disabled={state == "submitting"}><IconLogin size={22}/>{state == "submitting" ? "Logging in..." : "Log in"}</button>
        </Form>}
        {data?.handle && <>
          <h1 className="py-2 text-2xl font-semibold font-title">You're allready logged in</h1>
          <p className="text-primary-500">{data?.handle}</p>
          <Link to="/dashboard" className="button button-primary">Open dashboard</Link>
          <Link to="/logout" className="button button-ghost">Log out</Link>
        </>}
      </div>
    </MinimalLayout>
  );
}
