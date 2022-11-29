import { CircleFlag } from "react-circle-flags";
import FavIcon from "./favicon";
import { 
    IconQuestionMark, 
    IconBrandAndroid, IconBrandChrome, IconBrandWindows, IconBrandApple, IconBrandEdge, IconBrandFirefox, 
    IconDeviceTv, IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet, 
    IconLink, IconFileHorizontal, IconEngine, 
    type IconProps,
    IconBrandOpera,
    IconBrandOpenSource
 } from "./icons";

export default function Icon({ title, category, ...props }: { title: string; category: string; props?: IconProps }) {
    
    const iconProps = { size: 16, ...props}

    const DefaultIcon = <IconQuestionMark className="text-base-500" {...iconProps} />
    if (!title) return DefaultIcon;
    const i = title.toLowerCase();
    const c = category?.toLowerCase();
    // console.log(i,category)

    if(c.includes("countries")) return <CircleFlag className="h-4" countryCode={i} width="16" height="16" />;
    if(c.includes("referrers")) return <FavIcon className="h-4" alt={i} domain={i} size={16} />;

    if (i.includes("chrome")) return <IconBrandChrome {...iconProps} />;
    if (i.includes("chromium")) return <IconBrandChrome {...iconProps} />;
    if (i.includes("microsoft edge")) return <IconBrandEdge {...iconProps} />;
    if (i.includes("firefox")) return <IconBrandFirefox {...iconProps} />;
    if (i.includes("safari")) return <IconBrandApple {...iconProps} />;
    if (i.includes("opera")) return <IconBrandOpera {...iconProps} />;

    if (i.includes("windows phone")) return <IconBrandWindows {...iconProps} />;
    if (i.includes("windows")) return <IconBrandWindows {...iconProps} />;
    if (i.includes("macos")) return <IconBrandApple {...iconProps} />;
    if (i.includes("ios")) return <IconBrandApple {...iconProps} />;
    if (i.includes("android")) return <IconBrandAndroid {...iconProps} />;
    if (i.includes("linux")) return <IconBrandOpenSource {...iconProps} />;
    if (i.includes("chrome os")) return <IconBrandChrome {...iconProps} />;

    if (i == "desktop") return <IconDeviceDesktop {...iconProps} />;
    if (i == "tablet") return <IconDeviceTablet {...iconProps} />;
    if (i == "mobile") return <IconDeviceMobile {...iconProps} />;
    if (i == "tv") return <IconDeviceTv {...iconProps} />;

    if (
        i === "edgehtml" ||
        i === "blink" ||
        i === "trident" ||
        i === "presto" ||
        i === "gecko" ||
        i === "webkit"
    ) return <IconEngine {...iconProps} />;

    if (i.startsWith("/")) return <IconFileHorizontal {...iconProps} />;

    if (i.includes("://")) return <IconLink {...iconProps} />;

    return DefaultIcon;
};
