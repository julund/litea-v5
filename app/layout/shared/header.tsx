import { Message } from "~/components/message";
import { type IMessage } from "~/lib/session.server";

const Header = ({ children, message }: { children: React.ReactNode; message?: IMessage | null; }) => {

    return (
        <header className="sticky top-0 z-10 flex-grow-0 w-full bg-base-50">
            {children}
            <Message message={{ type: "info", text: "Ipsam provident pariatur cupiditate eum deserunt corrupti earum, aliquam dicta officia at repudiandae." }} />
            {message && <Message message={message} duration={5000} />}
        </header>
    );

};

export default Header;