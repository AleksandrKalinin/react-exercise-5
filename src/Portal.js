import { useEffect, Fragment } from "react";
import { createPortal } from "react-dom";

const Portal = ({children}) => {
  const mount = document.getElementById("modal");
  const el = document.createElement("div");

  return createPortal(
      <>
        <div className="modal-wrapper">
          {children}
        </div>
      </>, mount
    )
};

export default Portal;