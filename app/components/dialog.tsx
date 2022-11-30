import { useRef } from "react";
// import { useToggle } from "react-use";

export const Dialog = ({ children, button = "open dialog", ...props }: { children: React.ReactNode; button?: React.ReactNode } & React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) => {

    const ref = useRef<HTMLDialogElement>(null)
    // const [ show, toggle ] = useToggle(false);
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const dialog = ref?.current;
        if (dialog && typeof dialog.showModal === "function") {
            // dialog.hidden ? dialog.showModal() : dialog.close();
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

    const handleModalClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        
        const dialog = ref?.current;
        if (!dialog) return;
        var rect = dialog.getBoundingClientRect();
        var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
            && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            // console.log("clicked outside dialog")
            dialog.close();
        }
    }

    const handleClose = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
        const dialog = ref?.current;
        if (!dialog) return;
        console.log(e.type, dialog.returnValue);
    }

    return (
        <>
            <button onClick={handleButtonClick}>{button}</button>
            <dialog ref={ref} {...props} onClose={handleClose} onClick={handleModalClick}>
                {children}
                <hr className="my-4" />
                <form method="dialog" className="flex justify-end gap-2">
                    <button value="confirm" className="button button-primary">OK</button>
                    <button value="cancel" className="button button-ghost">Cancel</button>
                </form>
            </dialog>
        </>
    );
};