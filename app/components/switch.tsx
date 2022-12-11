import { LazyMotion, motion } from "~/lib/motion";
import { useToggle } from "react-use";
import { classNames } from "~/utils/helpers";

const loadFeatures = () => import("~/lib/motion.js").then(feature => feature.domAnimation);

export default function Switch({ title, defaultState = false, size = 22, className, onChange }: { title?: string | ((checked: boolean) => string) ; defaultState?: boolean; size?: number, className?: string; onChange?: Function }) {

    const [checked, toggle] = useToggle(defaultState);

    const handleToggle = () => {
        if (onChange) onChange(!checked);
        toggle();
    };

    const height = size;
    const width = (height * 2);
    const toggleSize = size;

    const currentTitle = () => <span>{(typeof title === "function") ? title(checked) : title}</span>;

    return (
        <LazyMotion features={loadFeatures}>
            <button className={classNames(className,"group")} onClick={handleToggle}>
                <div className="relative rounded-full bg-base-300" style={{ width: width, height: height }}>

                    <motion.div
                        className={classNames("absolute rounded-full transition-colors duration-500", checked ? "bg-primary-600 group-hover:bg-primary-700" : "bg-base-400 group-hover:bg-base-500")}
                        initial={{ x: 0, width: toggleSize, height: toggleSize }}
                        animate={{ x: checked ? (width - toggleSize) : 0 }}
                    >
                    </motion.div>

                    <input id="switch" name="switch" type="checkbox" checked={checked} readOnly value="title" className="hidden" />
                </div>
                <label htmlFor="swith" className="cursor-pointer">
                    { currentTitle() }
                </label>
            </button>
        </LazyMotion>
    );
}