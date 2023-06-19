import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Created this helper variable to get the "overlays" div in our
// index.html file in our public folder so that we can tell ReactDOM.createPortal()
// where to portal our custom elements to.
const portalElement = document.getElementById("overlays");

// Using react portals here to organize our code. Because the modal and it's
// overlay are child components that we need to render at the top level of
// the document we are going to create portals for both of them to render them
// in the specific location we want them in the DOM heirarchy.
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
