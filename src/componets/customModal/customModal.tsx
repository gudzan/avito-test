import Modal from "react-modal";
import "./customModal.css";

type CustomModalProps = {
    isOpen: boolean;
    onClose: Function;
    children: JSX.Element;
};

export const CustomModal = ({
    isOpen,
    onClose,
    children,
}: CustomModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            overlayClassName={"modal-overlay"}
            className={"modal-content"}
            closeTimeoutMS={300}
            onRequestClose={() => onClose()}
            ariaHideApp={false}
        >
            <button className="modal-close-button btn btn-outline-danger" onClick={() => onClose()}>
                <i className="bi bi-x-lg"></i>
            </button>
            
            {children}


        </Modal>
    );
};
