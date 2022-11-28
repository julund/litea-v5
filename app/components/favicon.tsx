export default function FavIcon({ domain, size = 16, alt, className, ...props } : { domain: string; size?: number, alt: string, className?: string; props?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}) {

    return (
        <span className="flex w-5 h-5 relative items-center">
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${domain}&sz=${size}`} className={className} alt={alt} {...props}/>
        </span>
    );
  }