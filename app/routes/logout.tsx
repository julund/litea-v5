import { type ActionFunction } from "@remix-run/node";
import { IconArrowBack } from "~/components/icons";
import { signOut } from "~/lib/auth.server";
import { Form, useTransition } from "@remix-run/react";
import { MinimalLayout } from "~/layout";

export const handle = { title: "Logout" };

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    await signOut(request);
};

export default function Logout() {

    const { state } = useTransition();

    return (
        <MinimalLayout>
            <div className="flex flex-col items-center text-center">
                <h1 className="py-2 text-2xl">Log out</h1>
                <p className="py-2">Are you sure you want to log out?</p>
                <Form method="post" className="" aria-disabled={state == "submitting"}>
                    <fieldset className="flex flex-col gap-2">
                        <button className="justify-center button button-primary disabled:opacity-40" disabled={state == "submitting"}>{state == "submitting" ? "Logging out..." : "Log out"}</button>
                        <button onClick={() => history.back()} className="button button-ghost"><IconArrowBack size={16} />Back</button>
                    </fieldset>
                </Form>
            </div>
        </MinimalLayout>
    );
}