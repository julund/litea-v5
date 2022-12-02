import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IconUser } from "~/components/icons";
import { Message } from "~/components/message";
import Time from "~/components/time";
import Container from "~/layout/shared/container";
import { getAccount } from "~/lib/db.server";

export const handle = { title: "Account" };

// this is a handy way to say: "x is whatever type y() resolves to"
type LoaderData = Awaited<ReturnType<typeof getAccount>>;

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
    const res = await getAccount(request);
    return json<LoaderData>(res);
};

export default function Account() {

    const { data: account, error } = useLoaderData<LoaderData>();

    return (
        <Container>
            <h1>Account</h1>
            <p className="text-base-500">Manage your account settings and configuration.</p>
            {error && <Message message={{ type: "error", text: error.message || "An unknown error occured."}} allowClose={false}/>}
            {account && <>
                <div className="flex items-center gap-2 py-4">
                    <div>
                        <IconUser className="text-primary-500" size={48} />
                    </div>
                    <div className="flex flex-col gap-1 py-4">
                        <div className="text-xl font-semibold font-title">{account?.email}</div>
                        <div className="text-base text-base-500">{account?.id}</div>

                    </div>
                </div>
                <div className="">Signed up <Time value={account?.created_at} /></div>
                <div className="">You logged in <Time value={account?.last_sign_in_at} /></div>
            </>
            }
        </Container>
    )
}