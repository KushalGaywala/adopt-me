import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Initializing modal which is the different component from the app
const modalRoot = document.getElementById("modal");

// Initializing the Model react component
const Modal = ({ children }) => {
  // useRef is used to initialize the component null
  // and only to create the element once
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    // appendChild is mounting the element
    modalRoot.appendChild(elRef.current);
    console.log(modalRoot);
    // This return is used to unmount the element from modalRoot when not needed
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // Create Portal by assiging the {children} part to the elRef.current part
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
