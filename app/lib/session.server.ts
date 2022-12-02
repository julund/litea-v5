// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createCookieSessionStorage, json, redirect, type SessionStorage, type Session as RemixSession, Response } from "@remix-run/node";

export interface IMessage {
    type: "info" | "error" | "warning" | "success";
    text: string;
}
export interface IData {
    handle?: string | null;
    token?: string | null;
}

export interface ISession {
    data: IData | null;
    message: IMessage | null;
}

export class Session {

    private sessionStorage: SessionStorage;
    private cookieName: string;

    public constructor() {

        if (!process.env.COOKIE_SECRET) throw new Error("COOKIE_SECRET must be set.");
        if (!process.env.COOKIE_MAXAGE) throw new Error("COOKIE_MAXAGE must be set.");
        if (!process.env.COOKIE_NAME) throw new Error("COOKIE_NAME must be set.");
        this.cookieName = process.env.COOKIE_NAME;
        this.sessionStorage = createCookieSessionStorage({
            cookie: {
                name: process.env.COOKIE_NAME,
                // domain: "localhost",
                httpOnly: true,
                maxAge: +process.env.COOKIE_MAXAGE,
                path: "/",
                sameSite: "lax",
                secrets: [process.env.COOKIE_SECRET],
                secure: process.env.NODE_ENV === "production",
            },
        });

    }

    public async current(request: Request) {

        const cookie = request.headers.get("Cookie");
        const session = await this.sessionStorage.getSession(cookie);
        return session;

    }

    public async get(request: Request) {

        const session = await this.current(request);
        const data: IData | null = session.has(this.cookieName) ? JSON.parse(session.get(this.cookieName)) : null;
        const message: IMessage | null = session.has("message") ? JSON.parse(session.get("message")) : null;
        return { data, message, headers: { "Set-Cookie": await this.sessionStorage.commitSession(session) } };

    }

    public async start(request: Request, data: { token: string, handle: string }, redirectTo?: string, message?: IMessage) {

        const session = await this.current(request);
        if (message) session.flash("message", JSON.stringify(message));
        session.set(this.cookieName, JSON.stringify(data));
        throw redirect(redirectTo || "/", { headers: { "Set-Cookie": await this.sessionStorage.commitSession(session) } });

    }

    public async end(request: Request, redirectTo?: string | null, message?: IMessage) {

        const session = await this.current(request);
        if (message) session.flash("message", JSON.stringify(message));
        session.unset(this.cookieName);
        throw redirect(redirectTo || "/", { headers: { "Set-Cookie": await this.sessionStorage.commitSession(session) } });
    }

}