import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Card = ({ title, graphic, children }: { title: string; graphic?: JSX.Element; children?: React.ReactNode }) => {

    const ref = useRef<HTMLDivElement>(null);
    const visible = useInView(ref, { amount: "all", once: true });

    const animate = { opacity: visible ? 1 : 0, scale: visible ? 1 : .85, x: visible ? 0 : -50 };
    const transition = { type: "tween", duration: 0.5 };

    return (
        <div ref={ref} className="flex gap-4 items-center p-4 mb-8">
            <motion.div animate={animate} transition={transition} className="shrink text-primary-600">
                {graphic}
            </motion.div>
            <motion.div animate={animate} transition={transition} className="grow">
                <h2>{title}</h2>
                <p>{children}</p>
            </motion.div>
        </div>
    );

};