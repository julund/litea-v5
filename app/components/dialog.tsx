import { useRef } from "react";
// import { useToggle } from "react-use";

export const Dialog = ({ children, button = "open dialog", ...props }: { children: React.ReactNode; button?: React.ReactNode } & React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) => {

    const ref = useRef<HTMLDialogElement>(null)
    // const [ show, toggle ] = useToggle(false);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const dialog = ref?.current;
        if (dialog && typeof dialog.showModal === "function") {
            // dialog.hidden ? dialog.showModal() : dialog.hidden = true;
            dialog.showModal()
            // console.log(dialog.hidden)
        } else {
            console.warn("The <dialog> API is not supported by this browser.");
        }
        // if (typeof ref?.current?.showModal === "function") {
        //     favDialog.showModal();
        //   } else {
        //     outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
        //   }
    };

    const handleClose = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
        const dialog = ref?.current;
        if (!dialog) return;
        console.log(dialog.returnValue);
    }

    return (
        <>
            <button onClick={handleClick}>{button}</button>
            <dialog ref={ref} {...props} onClose={handleClose}>
                {children}
                <hr className="my-4"/>
                <form method="dialog" className="flex gap-2 justify-end">
                    <button value="confirm" className="button button-primary">OK</button>
                    <button value="cancel" className="button button-ghost">Cancel</button>
                </form>
            </dialog>
        </>
    );
};