import invariant from "tiny-invariant";
import { getSite, getSiteStats } from "~/lib/db.server";
import { getPeriodByName, toCSV } from "~/utils/helpers";
import { format } from "date-fns";
// import { json } from "@remix-run/node"; // debug

export async function loader({ request, params }: { request: Request; params: any }) {

    invariant(params.site, "Expected params.site");
    const site = await getSite(request, params.site);
    if (site.error) throw new Response("Not Found", { status: 404 });

    const url = new URL(request.url);
    const period = url.searchParams.get("period") || "week";
    const time = url.searchParams.get("time") || format(Date.now(),"yyyy-MM-dd"); // todo: better default value
    const fileType: "csv" | "json" | unknown = url.searchParams.get("filetype"); // csv/json
    if (!(fileType === "csv" || fileType === "json")) throw new Response("Unknown file type requested", { status: 404 });

    const stats = site.data?.id ? await getSiteStats(request, site.data?.id, period, time) : { data: null, error: null };
    if (stats?.error) throw new Response("Not Found", { status: 404 });
    if (!stats?.data || stats?.data?.length === 0) throw new Response("No data", { status: 200 });
    // console.log(stats?.data);
    // const data = stats?.data;
    const data = stats?.data.map((stat: any) => {
        const arr: any = [];
        arr["time"] = stat.time;
        Object.entries(stat.aggregates).forEach(([key, value]: [key: string, value: any]) => {
            arr[key] = value.count || 0;
        });
        // console.log(...stat.countries);
        return { ...arr };
    });
    // console.log(data);

    const from = getPeriodByName(period, time).from;
    const to = getPeriodByName(period, time).to;
    const fileName = `${params.site}-${format(from, "yyyy-MM-dd-hhmm")}-${format(to, "yyyy-MM-dd-hhmm")}`;
    const body = fileType == "json" ? JSON.stringify(data) : toCSV(data);


    // return json(body); // debug

    return new Response(body, {
        status: 200,
        headers: {
            "Content-Type": `${fileType == "json" ? "application/json" : "text/plain"}; charset=utf-8`,
            "Content-Disposition": `attachment; filename=${fileName}.${fileType}`
        },
    });

}