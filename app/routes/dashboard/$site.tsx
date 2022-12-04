import invariant from "tiny-invariant";
import Container from "~/layout/shared/container";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { getSite, getSiteStats, getSiteVisitors } from "~/lib/db.server";
import { json, type LoaderFunction } from "@remix-run/node";
import { ExternalLink, Link } from "~/components/link";
import PeriodSelect from "~/components/periodSelect";
import { Message } from "~/components/message";
import Panel from "~/components/panel";
import { IconDownload, IconUser } from "~/components/icons";
import HorizontalBarChart from "~/components/charts/horizontalBarChart";
import Tab from "~/components/ui/tab";
import VerticalBarChart from "~/components/charts/verticalBarChart";
import { countryNameFromCode } from "~/utils/countries";
import Breadcrumbs from "~/components/breadcrumbs";
import Time from "~/components/time";
// import Map from "~/components/charts/mapChart";

export const handle = { title: "Site" };

// this is a handy way to say: "x is whatever type y() resolves to"
type LoaderData = {
    site: Awaited<ReturnType<typeof getSite>>;
    stats: Awaited<ReturnType<typeof getSiteStats>>;
    visitors: Awaited<ReturnType<typeof getSiteVisitors>>;
};

export const loader: LoaderFunction = async ({ request, params }: { request: Request; params: any }) => {

    invariant(params.site, "Expected params.site");
    const site = await getSite(request, params.site);
    if (site.error) throw new Response("Not Found", { status: 404 });

    const url = new URL(request.url);
    const period = url.searchParams.get("period") || "realtime";
    const time = period === "realtime" ? undefined : url.searchParams.get("time") || undefined;

    const stats = site.data?.id ? await getSiteStats(request, site.data?.id, period, time) : { data: null, error: null };
    const visitors = site.data?.id && period == "realtime" ? await getSiteVisitors(request, site.data?.id, period, time) : { data: null, error: null };

    return json<LoaderData>({ site, stats, visitors }, {
        headers: { // cache data if it is not realtime data
            "Cache-Control": period === "realtime" ?
                "max-age=3600, must-revalidate" :
                "max-age=3600, s-maxage=3600"
        }
    });
    // return json<LoaderData>({ site, stats, visitors });

};

export default function SitePage() {

    const { site, stats, visitors } = useLoaderData<LoaderData>();
    const [searchParams] = useSearchParams();
    const period = searchParams.get("period");
    const isRealtime = period === "realtime" || period === null;

    if (!site.data || !stats.data) return null;

    return (
        <Container>
            <nav className="sticky flex items-center justify-end w-full gap-4 px-6 py-4 bg-base-50">
                <Breadcrumbs current={site?.data?.title} />
                <ExternalLink to={site.data.url} className="text-base-500" title="Open site in new tab">{site?.data?.url}</ExternalLink>
            </nav>
            <div className="flex flex-col gap-4">
                {/* <h1>{site?.data?.title}</h1> */}
                <PeriodSelect />
                {site?.error && <Message message={{ type: "error", text: site?.error.message }} />}
                <Panel title="" stats={stats.data.aggregates} />
                {/* { JSON.stringify(stats.data)} */}

                {/* <HorizontalBarChart data={isRealtime ? stats.data?.graph && stats.data?.graph.slice(30, 60) : stats.data?.graph} /> */}

                {isRealtime ?
                    <div className="flex flex-wrap h-40 gap-2 p-4 bg-white bg-opacity-50 rounded-sm">
                        {visitors && visitors.data?.map(visitor => {
                            return (
                                <div className="flex flex-col flex-wrap gap-1 p-4 rounded-sm bg-base-100 text-base-600" key={visitor.id}>
                                    <span className="flex items-center gap-1 text-base" title={visitor.id}>
                                        <span><IconUser /></span>
                                        <span>{"..." + visitor.id.slice(visitor.id.length - 10)}</span>
                                    </span>
                                    <span className="text-sm">from {visitor.country && countryNameFromCode(visitor.country)} on {visitor.browser && visitor.browser}</span>
                                    <span className="text-xs">
                                        Last activity {visitor.lastActivityAt && <Time value={visitor.lastActivityAt} />}
                                        {/* Last activity { JSON.stringify(visitor.lastActivityAt)} */}
                                    </span>
                                    {/* {(visitor.visits && typeof visitor.visits === "object") && visitor.visits.join(" ")} */}
                                </div>
                            );
                        })}
                    </div>
                    :
                    <HorizontalBarChart data={stats.data?.graph} />
                }

                {/* <LineChart data={isRealtime ? stats?.graph && stats?.graph.slice(30, 60) : stats?.graph} /> */}
                {/* <Map className="col-span-2 p-4" data={stats.data?.countries} /> */}
                <div className="grid items-stretch justify-center grid-cols-1 gap-4 md:grid-cols-2">
                    <Tab chevronStyle={false} title="Countries">
                        <VerticalBarChart title="Countries" data={stats.data?.countries?.map((country: any) => ({ ...country, countryCode: country.name, name: countryNameFromCode(country.name) }))} />
                    </Tab>
                    <Tab chevronStyle={false} title="Referrers">
                        <VerticalBarChart title="Referrers" unknownName="direct/none" data={stats.data?.referrers?.map((referrer: any) => ({ ...referrer, domain: referrer.name }))} />
                    </Tab>
                </div>
                <div className="grid items-stretch justify-center grid-cols-1 gap-4 md:grid-cols-3">
                    <Tab chevronStyle={false} title="Device" titles={["Browsers", "Systems", "Platforms"]} >
                        <VerticalBarChart title="Browsers" data={stats.data?.browsers} />
                        <VerticalBarChart title="Systems" data={stats.data?.systems} />
                        <VerticalBarChart title="Platforms" data={stats.data?.platforms} />
                    </Tab>
                    <Tab chevronStyle={false} title="Sources" titles={["All Pages", "Entry Pages", "Exit Pages", "Queries", "Hashes"]}>
                        <VerticalBarChart title="All pages" data={stats.data?.pages?.all} />
                        <VerticalBarChart title="Entry pages" data={stats.data?.pages?.entry} />
                        <VerticalBarChart title="Exit pages" data={stats.data?.pages?.exit} />
                        <VerticalBarChart title="Queries" unknownName="none" data={stats.data?.queries} />
                        <VerticalBarChart title="Hashes" unknownName="none" data={stats.data?.hashes} />
                    </Tab>
                    <Tab chevronStyle={false} title="UTMs" titles={["Source", "Campaign", "Content", "Term"]}>
                        <VerticalBarChart unknownName="none" title="Source" data={stats.data?.utms?.sources} />
                        <VerticalBarChart unknownName="none" title="Campaign" data={stats.data?.utms?.campaigns} />
                        <VerticalBarChart unknownName="none" title="Content" data={stats.data?.utms?.contents} />
                        <VerticalBarChart unknownName="none" title="Terms" data={stats.data?.utms?.terms} />
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
    );
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