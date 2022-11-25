import { BiLoaderAlt } from "react-icons/bi";

const Spinner = ({ size = 22, ...props }) => {
    return (
        <BiLoaderAlt className="fill-current animate-spin text-primary-500" size={size} {...props} />
    );
};

export default Spinner;