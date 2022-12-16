import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ShouldReloadFunction } from "@remix-run/react";
import style from "./root.css";
import Tooltip from "./components/tooltips";

export const unstable_shouldReload: ShouldReloadFunction = () => false;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "icon", href: "/favicon.png", type: "image/png" },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Litea • Lightweight analytics",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Tooltip/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
