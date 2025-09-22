import React from "react";

import "./ModalView.css"

interface ModalProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const ModalView: React.FC<ModalProps> = ({ message, type = "success", onClose }) => {
    return (
        <div className="modal_overlay">
            <div className={`modal_container ${type}`}>
                <p>{message}</p>
                <button onClick={onClose} className="modal_close_button">Cerrar</button>
            </div>
        </div>
    );

};

export default ModalView;
