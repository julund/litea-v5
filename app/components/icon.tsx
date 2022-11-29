import { CircleFlag } from "react-circle-flags";
import FavIcon from "./favicon";
import { 
    IconCircle, 
    IconBrandAndroid, IconBrandChrome, IconBrandWindows, IconBrandApple, IconBrandEdge, IconBrandFirefox, 
    IconDeviceTv, IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet, 
    IconLink, IconFileText, IconEngine, 
    type IconProps
 } from "./icons";

export default function Icon({ title, category, ...props }: { title: string; category: string; props?: IconProps }) {
    
    if (!title) return <IconCircle />;
    const i = title.toLowerCase();
    const c = category?.toLowerCase();
    console.log(i,category)

    if(c.includes("countries")) return <CircleFlag className="h-5" countryCode={i} width="20" height="20" />;
    if(c.includes("referrers")) return <FavIcon className="h-5" alt={i} domain={i} size={32} />;

    if (i.includes("chrome")) return <IconBrandChrome />;
    if (i.includes("chromium")) return <IconBrandChrome />;
    if (i.includes("microsoft edge")) return <IconBrandEdge />;
    if (i.includes("firefox")) return <IconBrandFirefox />;

    if (i.includes("windows phone")) return <IconBrandWindows />;
    if (i.includes("windows")) return <IconBrandWindows />;
    if (i.includes("macos")) return <IconBrandApple />;
    if (i.includes("ios")) return <IconBrandApple />;
    if (i.includes("android")) return <IconBrandAndroid />;
    if (i.includes("linux")) return <IconDeviceDesktop />;
    if (i.includes("chrome os")) return <IconBrandChrome />;

    if (i == "desktop") return <IconDeviceDesktop />;
    if (i == "tablet") return <IconDeviceTablet />;
    if (i == "mobile") return <IconDeviceMobile />;
    if (i == "tv") return <IconDeviceTv />;

    if (
        i === "edgehtml" ||
        i === "blink" ||
        i === "trident" ||
        i === "presto" ||
        i === "gecko" ||
        i === "webkit"
    ) return <IconEngine />;

    if (i.startsWith("/")) return <IconFileText />;

    if (i.includes("://")) return <IconLink />;

    return <IconCircle />;
};
