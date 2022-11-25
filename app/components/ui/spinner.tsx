import { IconLoader } from "../icons";

const Spinner = ({ size = 18, ...props }) => {
    return (
        <IconLoader className="fill-current items-center animate-spin text-base-600" size={size} {...props} />
    );
};

export default Spinner;