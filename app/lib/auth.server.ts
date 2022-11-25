import { type IMessage, Session, type ISession } from "~/lib/session.server";
import { anonClient } from "./supabase";

const session = new Session();

export async function check(request: Request, redirectTo?: string | null, noTokenMessage?: IMessage) {

    const { data, message, headers } = await session.get(request);
    if (!data && redirectTo) await session.end(request, redirectTo, { type: "warning", text: "Unauthenticated." });

    if(!data?.token) return { data, message: message ?? noTokenMessage ?? null, headers };
    
    const client = anonClient(data?.token);
    const { error } = await client.auth.getUser(data?.token);
    if (error) await session.end(request, redirectTo, { type: "error", text: error.message });

    return { data, message, headers };

}

export async function signIn(request: Request, email: string, password: string) {

    const { data, error } = await anonClient().auth.signInWithPassword({ email, password });
    if (error) { await session.end(request, "/login", { type: "error", text: error.message }); return null; }

    if (data.user?.email && data.session?.access_token) {
        const message: IMessage = !data.user?.confirmed_at ? 
        { type: "warning", text: "Confirmation required." } :
        !data.user?.last_sign_in_at ? 
        { type: "success", text: "{first_login_onboarding_message}" } :
        { type: "success", text: `Welcome back, ${data.user?.email}!` };
        await session.start(request, {
            handle: data.user.email,
            token: data.session.access_token
        }, "/dashboard", message);
    }

    return null;

}

export async function signOut(request: Request) {

    const { data } = await getSession(request);
    if (!data?.token) {
        await session.end(request, "/", { type: "warning", text: "Your are not signed in." });
    } else {
        const { error } = await anonClient().auth.admin.signOut(data.token);
        if (error) await session.end(request, "/login", { type: "error", text: error.message });
        await session.end(request, "/", { type: "info", text: "You have been signed out." });
    }
    return null;
}

export async function getSession(request: Request): Promise<ISession> {

    const current = await session.current(request);
    let data, message;
    try {
        data = JSON.parse(current.get("session"));
    } catch (error) {
        data = null;
    }
    try {
        message = JSON.parse(current.get("message"));
    } catch (error) {
        message = null;
    }
    const res = { data, message };
    // console.log(res)
    return res;

}