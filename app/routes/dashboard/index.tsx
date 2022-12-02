import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "~/components/link";
import { getAllSites } from "~/lib/db.server";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { IconCircle, IconCircleDotted } from "~/components/icons";
import Container from "~/layout/shared/container";
import { Message } from "~/components/message";

export const handle = { title: "Sites" };

// this is a handy way to say: "x is whatever type y() resolves to"
type LoaderData = Awaited<ReturnType<typeof getAllSites>>;

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
    const { data, error } = await getAllSites(request);
    return json<LoaderData>({ data, error });
};

export default function SitesPage() {

    const { data, error } = useLoaderData<LoaderData>();

    const formatTime = (value: string) => format(parseISO(value), "Pp", { locale: enGB });

    return (
        <Container>
            <h1>Dashboard</h1>
            <p className="text-base-500">Manage your sites and view analytics.</p>
            <div className="flex flex-col items-stretch py-2 divide-y rounded-sm divide-dashed">
                {error && <Message message={{ type: "error", text: error.message }} allowClose={false} />}
                {data && data.map(({ id, title, url, created_at }) => {
                    return (
                        <div key={id} className="flex flex-row items-center gap-4 px-8 py-4 transition-all rounded-sm group hover:bg-base-100">
                            <span className="flex flex-col">
                                {title === "Text-let (test)" ?
                                    <IconCircleDotted className="text-gray-400 cursor-pointer fill-current stroke-2" /> :
                                    <IconCircle className="text-green-400 cursor-pointer fill-current" />
                                }
                            </span>
                            <Link prefetch="intent" className="flex flex-col flex-grow p-2 break-words rounded-sm text-base-800 hover:text-primary-800" to={"./" + url}>
                                <span className="text-xl font-semibold font-title">{title ?? url}</span>
                                <span className="font-sans text-title text-base-600">{url}</span>
                            </Link>
                            <span className="flex flex-col">
                                <span className="text-base font-title text-base-600">{formatTime(created_at)}</span>
                            </span>
                            <button className="flex flex-col invisible p-2 rounded-sm group-hover:visible hover:bg-base-100 hover:bg-opacity-60">
                                ...
                            </button>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}