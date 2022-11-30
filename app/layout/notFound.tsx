import { useLocation } from "@remix-run/react";
// import { Link } from "~/components/link";
import { IconArrowBack } from '~/components/icons';

export default function NotFound() {
    let { pathname } = useLocation();
    return (
        <>
            <h1>Page not found</h1>
            <p className="py-2">We were unable to find the page <b>{pathname}</b>.</p>
            <p className="py-2">Officia corrupti modi earum facere reiciendis ut. Neque modi omnis dignissimos, deleniti quas deserunt, similique eius eos in odit fuga libero atque.</p>
            {/* <Link to="/" className="inline-flex button button-ghost"><IconArrowBack /> Go back home.</Link> */}
            <button onClick={() => history.back()} className="button button-ghost"><IconArrowBack size={16} />Go back</button>
        </>
    )
}