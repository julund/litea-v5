import invariant from "tiny-invariant";
import Container from "~/layout/dashboard/container";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { getSite, getSiteStats } from "~/lib/db.server";
import { json, type LoaderFunction } from "@remix-run/node";
import { ExternalLink, Link } from "~/components/link";
import PeriodSelect from "~/components/periodSelect";
import { Message } from "~/components/message";
import Panel from "~/components/panel";
import { IconDownload } from "~/components/icons";
import HorizontalBarChart from "~/components/charts/horizontalBarChart";

export const handle = { title: "Site" };

// this is a handy way to say: "x is whatever type y() resolves to"
type LoaderData = {
    site: Awaited<ReturnType<typeof getSite>>;
    stats: Awaited<ReturnType<typeof getSiteStats>>;
};

export const loader: LoaderFunction = async ({ request, params }: { request: Request; params: any }) => {

    invariant(params.site, "Expected params.site");
    const site = await getSite(request, params.site);
    if (site.error) throw new Response("Not Found", { status: 404 });

    const url = new URL(request.url);
    const period = url.searchParams.get("period") || "week";
    const index = Number(url.searchParams.get("index")) || 0;

    const stats = site.data?.id ? await getSiteStats(request, site.data?.id, period, index) : { data: null, error: null };

    return json<LoaderData>({ site, stats });

};

export default function SitePage() {

    const { site, stats } = useLoaderData<LoaderData>();
    const [searchParams] = useSearchParams();
    const period = searchParams.get("period");
    const isRealtime = period === "realtime";
    if (!site.data || !stats.data) return null;

    return (
        <Container>
            <div className="flex flex-col gap-2">
                <h1>{site?.data?.title}</h1>
                <div className="text-base-500">
                    <ExternalLink to={site.data.url} title="Open site in new tab">{site?.data?.url}</ExternalLink>
                </div>
                <PeriodSelect />
                {site?.error && <Message message={{ type: "error", text: site?.error.message }} />}
                <Panel title="" stats={stats.data.aggregates} />
                {/* { JSON.stringify(stats.data)} */}
                <HorizontalBarChart data={isRealtime ? stats.data?.graph && stats.data?.graph.slice(30, 60) : stats.data?.graph} />

                {/* <LineChart data={isRealtime ? stats?.graph && stats?.graph.slice(30, 60) : stats?.graph} /> */}


                {/* <div className="grid grid-flow-row grid-cols-1 m-4 bg-gray-50 md:grid-cols-3 md:grid-flow-col">
                    <Map className="col-span-2 p-4" data={stats.data?.countries} />
                    <Tab className="col-span-1 p-4" chevronStyle={true} titles={["Countries"]}>
                        <VerticalBarChart title="Countries" data={stats.data?.countries?.map(country => ({ ...country, countryCode: country.name, name: countryNameFromCode(country.name) }))} />
                    </Tab>
                </div>
                <div className="grid grid-cols-1 m-2 sm:grid-cols-2">
                    <Tab chevronStyle={true} title="Device" titles={["Browsers", "Systems", "Platforms"]}>
                        <VerticalBarChart title="Browsers" data={stats.data?.browsers} />
                        <VerticalBarChart title="Systems" data={stats.data?.systems} />
                        <VerticalBarChart title="Platforms" data={stats.data?.platforms} />
                    </Tab>
                    <Tab chevronStyle={true} title="Sources" titles={["All Pages", "Entry Pages", "Exit Pages"]}>
                        <VerticalBarChart title="All pages" data={stats.data?.pages?.all} />
                        <VerticalBarChart title="Entry pages" data={stats.data?.pages?.entry} />
                        <VerticalBarChart title="Exit pages" data={stats.data?.pages?.exit} />
                    </Tab>
                </div>
                <div className="grid grid-cols-1 m-2 sm:grid-cols-2">
                    <Tab chevronStyle={true} title="UTMs" titles={["Source", "Campaign", "Content", "Term"]}>
                        <VerticalBarChart title="Source" data={stats.data?.utms?.sources.filter(e => e.name !== "")} />
                        <VerticalBarChart title="Campaign" data={stats.data?.utms?.campaigns.filter(e => e.name !== "")} />
                        <VerticalBarChart title="Content" data={stats.data?.utms?.contents.filter(e => e.name !== "")} />
                        <VerticalBarChart title="Terms" data={stats.data?.utms?.terms.filter(e => e.name !== "")} />
                    </Tab>
                    <Tab chevronStyle={true} title="Sources" titles={["Queries", "Hashes", "Referrers"]}>
                        <VerticalBarChart title="Queries" data={stats.data?.queries} />
                        <VerticalBarChart title="Hashes" data={stats.data?.hashes} />
                        <VerticalBarChart title="Referrers" data={stats.data?.referrers} />
                    </Tab>
                </div> */}
                {!isRealtime && <span className="flex flex-row flex-wrap items-center justify-center flex-shrink gap-2">
                    <IconDownload />
                    <p className="text-sm text-gray-700 text-bold">Export:</p>
                    <Link to={`export?${searchParams.toString()}&filetype=json`} reloadDocument>JSON</Link>
                    <Link to={`export?${searchParams.toString()}&filetype=csv`} reloadDocument>CSV</Link>
                </span>}
            </div>
        </Container>
    )
}

export function CatchBoundary() {
    const params = useParams();
    return (
        <Container>
            <div className="p-4 text-center message-warning">
                <h1>Site not found</h1>
                <p className="py-2">Site '{params.site}' not found or access denied.</p>
            </div>
        </Container>
    );
}