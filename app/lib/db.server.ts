import { getSession } from "./auth.server";
import { anonClient } from "./supabase";
import { getPeriodDates, merged, zonedTimeToUtcString } from "~/utils/helpers";

async function initclient(request: Request) {
    const { data: session } = await getSession(request);
    // if (!session?.token) return { data: null, error: { code: "403", details: "", hint: "", message: "Missing authentication token"} };
    const client = anonClient(session?.token);
    // console.log(client);
    return client;
}

export async function getAllSites(request: Request) {

    const { data: session } = await getSession(request);
    if (!session?.token) return { data: null, error: { code: "403", details: "", hint: "", message: "Missing authentication token" } };

    const client = anonClient(session?.token);
    const { data, error } = await client.from("sites").select().order("id", { ascending: true });
    return { data, error };

};

export async function getSite(request: Request, url: string) {

    const client = await initclient(request);
    const { data, error } = await client.from("sites").select().eq("url", url).single();
    return { data, error };

}

export async function getSiteStats(request: Request, siteId: string, period: string, index: number, mergeData = true) {

    const client = await initclient(request);
    const from = zonedTimeToUtcString(getPeriodDates(period, index).from);
    const to = zonedTimeToUtcString(getPeriodDates(period, index).to);
    const { data, error } = await client.from("stats").select().eq("site_id", siteId).gte("time", from).lte("time", to);
    return { data: mergeData === true ? merged(data, period, index) : data, error };

}

export async function getSiteVisitors(request: Request, siteId: string, period: string, index: number) {

    const client = await initclient(request);
    const from = zonedTimeToUtcString(getPeriodDates(period, index).from);
    const to = zonedTimeToUtcString(getPeriodDates(period, index).to);
    const { data, error } = await client.from("visitors").select().eq("site_id", siteId).gte("time", from).lte("time", to);

    const modified = data?.map(visitor => {
        // @ts-ignore
        const lastActivityAt : string | null = (visitor.visits !== null && typeof visitor?.visits === "object" ) ? visitor.visits.reduce((t: number, c: any) => c.time > t ? c.time : t, 0 ) : null;
        // console.log(new Date(lastActivityAt).toISOString(), visitor.time)
        return {
            ...visitor,
            lastActivityAt: lastActivityAt ? new Date(lastActivityAt).toISOString() : null
        };
    }) || null;

    return { data: modified, error };

}

export async function getAccount(request: Request) {

    const { data: session } = await getSession(request);
    if (!session?.token) return { data: null, error: null };

    const client = anonClient(session?.token);
    const { data: { user }, error: userError } = await client.auth.getUser(session?.token);
    // return { data: user, error: userError };
    if (userError || !user) return { data: null, error: { message: userError?.message } };
    const { data: customer, error: accountError } = await client.from("customers").select().eq("id", user.id).single();
    if (accountError || !customer) return { data: null, error: { message: accountError?.message } };
    const { id, email, last_sign_in_at, created_at } = user;
    const account = { id, email, max_allowed_pageViews: customer?.max_allowed_pageViews, last_sign_in_at, created_at };
    return { data: account, error: null };

};