import { useLocation } from "@remix-run/react";
import { Link } from "~/components/link";
import { IconArrowBack } from '~/components/icons';

export default function NotFound() {
    let { pathname } = useLocation();
    return (
        <div className="py-8 text-center">
            <h1 className="text-red-500">404 - not found</h1>
            <p className="py-2">We were unable to find the page <b>{pathname}</b>.</p>
            <p className="py-2">Please click the link below to find your way around ;)</p>
            <Link to="/" className="inline-flex button button-ghost"><IconArrowBack /> Go back home.</Link>
        </div>
    )
}