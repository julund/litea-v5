import { useRef } from "react";
// import { useToggle } from "react-use";

export const Dialog = ({ children, ...props }: { children: React.ReactNode } & React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) => {

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
            <button onClick={handleClick}>open dialog</button>
            <dialog ref={ref} {...props} onClose={handleClose}>
                {children}
                <form method="dialog">
                    <button value="cancel">Cancel</button>
                    <button value="confirm">Confirm</button>
                </form>
            </dialog>
        </>
    );
};