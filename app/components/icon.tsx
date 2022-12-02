import { CircleFlag } from "react-circle-flags";
// import ReactCountryFlag from "react-country-flag";
import FavIcon from "./favicon";
import {
    IconQuestionMark,
    IconBrandAndroid, IconBrandChrome, IconBrandWindows, IconBrandApple, IconBrandEdge, IconBrandFirefox, IconBrandOpera, IconBrandOpenSource, 
    IconDeviceTv, IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet,
    IconLink, IconFileHorizontal, IconEngine,
    type IconProps,
} from "./icons";

export default function Icon({ title, category, size = 16, ...props }: { title: string; size?: number; category: string; } & IconProps) {

    const DefaultIcon = <IconQuestionMark {...props} />;
    if (!title) return DefaultIcon;
    const i = title.toLowerCase();
    const c = category?.toLowerCase();
    // console.log(i,category)

    if(c.includes("countries")) return <CircleFlag className={props.className} countryCode={i} width="16" height="16" />;
    // if (c.includes("countries") && i.length === 2) return (
    //     <span className="overflow-hidden" style={{ width: size, height: size }}>
    //         <ReactCountryFlag svg className={props.className} countryCode={i} style={{
    //             width: "auto",
    //             height: +(size * 1.5).toFixed(0),
    //             objectFit: "cover",
    //         }} />
    //     </span>
    // );
    if (c.includes("referrers")) return <FavIcon className={props.className} alt={i} domain={i} size={16} />;

    if (i.includes("chrome")) return <IconBrandChrome {...props} />;
    if (i.includes("chromium")) return <IconBrandChrome {...props} />;
    if (i.includes("microsoft edge")) return <IconBrandEdge {...props} />;
    if (i.includes("firefox")) return <IconBrandFirefox {...props} />;
    if (i.includes("safari")) return <IconBrandApple {...props} />;
    if (i.includes("opera")) return <IconBrandOpera {...props} />;

    if (i.includes("windows phone")) return <IconBrandWindows {...props} />;
    if (i.includes("windows")) return <IconBrandWindows {...props} />;
    if (i.includes("macos")) return <IconBrandApple {...props} />;
    if (i.includes("ios")) return <IconBrandApple {...props} />;
    if (i.includes("android")) return <IconBrandAndroid {...props} />;
    if (i.includes("linux")) return <IconBrandOpenSource {...props} />;
    if (i.includes("chrome os")) return <IconBrandChrome {...props} />;

    if (i == "desktop") return <IconDeviceDesktop {...props} />;
    if (i == "tablet") return <IconDeviceTablet {...props} />;
    if (i == "mobile") return <IconDeviceMobile {...props} />;
    if (i == "tv") return <IconDeviceTv {...props} />;

    if (
        i === "edgehtml" ||
        i === "blink" ||
        i === "trident" ||
        i === "presto" ||
        i === "gecko" ||
        i === "webkit"
    ) return <IconEngine {...props} />;

    if (i.startsWith("/")) return <IconFileHorizontal {...props} />;

    if (i.includes("://")) return <IconLink {...props} />;

    return DefaultIcon;
};
