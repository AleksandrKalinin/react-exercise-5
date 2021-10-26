import { Fragment } from "react";
import { createPortal } from "react-dom";

const Portal = ({children}) => {
  const modal = document.getElementById("modal");

  return createPortal(
      <>
        <div className="modal-wrapper">
          {children}
        </div>
      </>, modal
    )
};

export default Portal;