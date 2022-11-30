import { useSpring, animated, config } from "react-spring";

const Page = ({ children, ...props } : { children: React.ReactNode; props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> }) => {
    const fade = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -5 }, config: config.wobbly });
    return (
        <animated.div className="p-10" {...props} style={fade}>
            {children}
        </animated.div>
    );
};

export default Page;