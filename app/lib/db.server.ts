import { getSession } from "./auth.server";
import { anonClient } from "./supabase";
import { mergedStatsDataWithChange, type StatsData} from "~/utils/helpers";
import { getPeriodByName, merged, zonedTimeToUtcString } from "~/utils/helpers";

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

export async function getSiteStats(request: Request, siteId: string, period: string, time?: string) {

    const {from, to } = getPeriodByName(period, time);
    const client = await initclient(request);
    const fromTime = zonedTimeToUtcString(from);
    const toTime = zonedTimeToUtcString(to);
    const { data, error } = await client.from("stats").select().eq("site_id", siteId).gte("time", fromTime).lte("time", toTime);
    const statsData = data as unknown as StatsData[];
    return { data: statsData, error };

}

export async function getMergedSiteStats(request: Request, siteId: string, period: string, time?: string) {

    const { data, error } = await getSiteStats(request, siteId, period, time);
    const statsData = data as unknown as StatsData[];
    return { data: merged(statsData, period, time), error };

}

export async function getMergedSiteStatsWithChange(request: Request, siteId: string, period: string, time?: string) {

    const { data: currentData, error: currentError } = await getMergedSiteStats(request, siteId, period, time);
    const currentStatsData = currentData as unknown as StatsData[];

    const { previous } = getPeriodByName(period, time);
    const { data: previousData, error: previousError } = await getMergedSiteStats(request, siteId, period, previous);
    const previousStatsData = previousData as unknown as StatsData[];

    const  mergedCurrent = merged(currentStatsData, period, time);
    const  mergedPrevious = merged(previousStatsData, period, time);

    // console.log(mergedCurrent);
    // console.log(mergedPrevious);
    const data = mergedStatsDataWithChange(mergedCurrent, mergedPrevious);

    return { data, error: currentError || previousError };

}

export async function getSiteVisitors(request: Request, siteId: string, period: string, time?: string) {

    const client = await initclient(request);
    const from = zonedTimeToUtcString(getPeriodByName(period, time).from);
    const to = zonedTimeToUtcString(getPeriodByName(period, time).to);
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