# Litea analytics 

Lightweight website analytics SaaS service free from cookies and fully compliant with `GDPR`, `CCPA` and `PECR`.

## Features
- Simple and flexible pricing model, competitive pricing
- [Elegant and easy to learn user interface
- Free from cookies and full compliance to not require any consent, popups and warnings to end users.

## Technical details
Tech stack is React, Next.js, Vercel, Stripe and Supabase. See `package.json` for a full list of dependencies.

## Feature list
List of features with status of implementation.

### Main app (analytics dashboard)
| Status| Description |
| ----------- | ----------- |
| In progress | Users can add sites |
| Not started | Account and subscription |

### Develompemnt on Gitpod

If developing on [Gitpod](https://gitpod.io) you'll have to use a modified version of `LiveReload` in `@remix-run/react/dist/components.js` as shown below.

```sh
// Use modified ' host' and 'socketPath' for LiveReload to work while developing on Gitpod
// let host = location.hostname;
// let socketPath = protocol + "//" + host + ":" + ${String(port)} + "/socket";
let host = location.hostname.slice(4);
let socketPath = protocol + "//" + ${ String(port)} + host + "/socket"; 
```