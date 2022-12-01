import { isValidDomain } from "~/utils/helpers";
import { IconQuestionMark } from "./icons";
  
export default function FavIcon({ domain, size = 16, alt, className, ...props }: { domain: string; size?: number; alt: string; className?: string; props?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> }) {

    if (!isValidDomain(domain)) return <IconQuestionMark size={size} className={className} title={alt} />;

    const url = `https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}&sz=${size}`;
    // const url = `https://www.google.com/s2/favicons?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&domain=${domain}&size=${size}`;
    // const url = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=${size}`;

    return (
        <img src={url} className={className} alt={alt} {...props} />
    );

}
