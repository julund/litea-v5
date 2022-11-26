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
import Tab from "~/components/ui/tab";
import VerticalBarChart from "~/components/charts/verticalBarChart";
import { countryNameFromCode } from "~/utils/countries";
import Breadcrumbs from "~/components/breadcrumbs";
// import Map from "~/components/charts/mapChart";

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
    const period = url.searchParams.get("period") || "realtime";
    const index = period === "realtime" ? 0 : Number(url.searchParams.get("index")) || 0;

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
        <>
            <nav className="flex items-center justify-end w-full gap-4 px-6 py-4 border-b-2 bg-white/50 border-base-100">
                <Breadcrumbs current={site?.data?.title} />
                <ExternalLink to={site.data.url} className="text-base-500" title="Open site in new tab">{site?.data?.url}</ExternalLink>
            </nav>
            <Container>
                <div className="flex flex-col gap-2">
                    {/* <h1>{site?.data?.title}</h1> */}
                    <PeriodSelect />
                    {site?.error && <Message message={{ type: "error", text: site?.error.message }} />}
                    <Panel title="" stats={stats.data.aggregates} />
                    {/* { JSON.stringify(stats.data)} */}
                    <HorizontalBarChart data={isRealtime ? stats.data?.graph && stats.data?.graph.slice(30, 60) : stats.data?.graph} />
                    {/* <LineChart data={isRealtime ? stats?.graph && stats?.graph.slice(30, 60) : stats?.graph} /> */}
                    {/* <Map className="col-span-2 p-4" data={stats.data?.countries} /> */}
                    <div className="grid items-stretch justify-center grid-cols-2 gap-2">
                        <Tab className="col-span-1 p-4" chevronStyle={false} title="Countries" titles={["Countries"]}>
                            <VerticalBarChart title="Countries" data={stats.data?.countries?.map((country: any) => ({ ...country, countryCode: country.name, name: countryNameFromCode(country.name) }))} />
                        </Tab>
                        <Tab chevronStyle={false} title="Device" titles={["Browsers", "Systems", "Platforms"]}>
                            <VerticalBarChart title="Browsers" data={stats.data?.browsers} />
                            <VerticalBarChart title="Systems" data={stats.data?.systems} />
                            <VerticalBarChart title="Platforms" data={stats.data?.platforms} />
                        </Tab>
                        <Tab chevronStyle={false} title="Sources" titles={["All Pages", "Entry Pages", "Exit Pages"]}>
                            <VerticalBarChart title="All pages" data={stats.data?.pages?.all} />
                            <VerticalBarChart title="Entry pages" data={stats.data?.pages?.entry} />
                            <VerticalBarChart title="Exit pages" data={stats.data?.pages?.exit} />
                        </Tab>
                        <Tab chevronStyle={false} title="UTMs" titles={["Source", "Campaign", "Content", "Term"]}>
                            <VerticalBarChart title="Source" data={stats.data?.utms?.sources.filter((e: any) => e.name !== "")} />
                            <VerticalBarChart title="Campaign" data={stats.data?.utms?.campaigns.filter((e: any) => e.name !== "")} />
                            <VerticalBarChart title="Content" data={stats.data?.utms?.contents.filter((e: any) => e.name !== "")} />
                            <VerticalBarChart title="Terms" data={stats.data?.utms?.terms.filter((e: any) => e.name !== "")} />
                        </Tab>
                        <Tab chevronStyle={false} title="Sources" titles={["Queries", "Hashes", "Referrers"]}>
                            <VerticalBarChart title="Queries" data={stats.data?.queries} />
                            <VerticalBarChart title="Hashes" data={stats.data?.hashes} />
                            <VerticalBarChart title="Referrers" data={stats.data?.referrers} />
                        </Tab>
                    </div>

                    {!isRealtime && <span className="flex flex-row items-center justify-center flex-shrink gap-2">
                        <IconDownload />
                        <p className="text-sm text-gray-700 text-bold">Download:</p>
                        <Link to={`export?${searchParams.toString()}&filetype=json`} className="button button-ghost" reloadDocument>.json</Link>
                        <Link to={`export?${searchParams.toString()}&filetype=csv`} className="button button-ghost" reloadDocument>.csv</Link>
                    </span>}
                </div>
            </Container>
        </>
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