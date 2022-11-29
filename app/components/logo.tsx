import { Link } from "./link";

const Logo = ({ to, hidetitle = false }: { to: string; hidetitle?: boolean}) => {
    return(
        <Link to={to} className="inline-flex p-2 select-none"> 
            {!hidetitle && <span className="uppercase text-xl font-title font-black text-primary-900">Litea</span>}
            <svg className="h-6 w-auto" width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path d="M69.92 30.118l-17.067 44.2 16.553 40.65c-10.027 3.737-21.407 3.962-32.174-.195-23.376-9.027-35.01-35.294-25.983-58.671 9.026-23.377 35.294-35.01 58.67-25.984z" className="text-primary-600" fill="currentColor"/>
                <path d="M108.192 55.381l-46.65 20.34 18.379 44.402c12.634-4.945 23.195-14.911 28.435-28.482 4.684-12.131 4.283-24.987-.164-36.26z" className="text-primary-500" fill="currentColor"/>
                <path d="M86.36 11.445L65.295 66l52.231-23.302c-5.627-13.713-16.492-25.214-31.166-31.253z" className="text-primary-200" fill="currentColor"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h128v128H0z"/></clipPath></defs></svg>
        </Link>
    );
};

export default Logo;