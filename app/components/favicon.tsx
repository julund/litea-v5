import { isValidDomain } from "~/utils/helpers";
import { IconQuestionMark } from "./icons";

export default function FavIcon({ domain, size = 16, alt, className, ...props }: { domain: string; size?: number; alt: string; className?: string; props?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> }) {

    // `https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}&sz=${size}`
    // `https://www.google.com/s2/favicons?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&domain=${domain}&size=${size}`
    // `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=${size}`
    // `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&domain=${domain}&size=${size}`

    if (!isValidDomain(domain)) return <IconQuestionMark size={size} className={className} title={alt} />;
    // const validUrl = validUrlDomain(domain);
    return (
        <img src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}&sz=${size}`} className={className} alt={alt} {...props} />
    );

}
