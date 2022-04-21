import React from "react";
import {Modal} from "react-bootstrap";
import ReactDOM from "react-dom";

type ModalPictureProps = {
    show: boolean,
    handleClose: () => void
}

const ModalApp: (props: ModalPictureProps) => (null | React.ReactPortal) = (props: ModalPictureProps) => {
    if (!props.show) return null
    return ReactDOM.createPortal(
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
        </Modal>,
        document.body
    )
}

export default ModalApp;