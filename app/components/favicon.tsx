// const validUrlDomain = (domain: string) => {
//     try {
//         const parsedUrl = new URL(`https://${domain}`);
//         console.log(parsedUrl)
//         return parsedUrl.hostname;
//     } catch (e) {
//         console.log(e)
//         return false;
//     }
// }

export default function FavIcon({ domain, size = 16, alt, className, ...props }: { domain: string; size?: number; alt: string; className?: string; props?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> }) {

    // https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://stackoverfl.om&size=16

    // const validUrl = validUrlDomain(domain);
    return (
        <span className="relative flex items-center w-5 h-5">
            {/* {validUrl && <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${validUrl}&sz=${size}`}
                className={className}
                alt={alt}
                {...props}
            />} */}
            <img src={`https://www.google.com/s2/favicons?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&domain=${domain}&size=${size}`} className={className} alt={alt} {...props}/>
            {/* <img src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}&sz=${size}`} className={className} alt={alt} {...props}/> */}
        </span>
    );
}