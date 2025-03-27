import { useState } from "react";
import "./ModalButton.css";
import PropTypes from "prop-types";

function ModalButton( { buttonText, children}) {
  const [ openModal, setOpenModal ] = useState(false);

  return (
    <>
      <button className="search-btn" onClick={() => setOpenModal(true)}>
        {buttonText ? buttonText : "Undifined"}
      </button>

      {openModal && (
        <>
        <div className="search-modal">
          {children}
        </div>
          <button className="close-btn" onClick={() => setOpenModal(false)}>
            ✖
          </button>
        </>
      )}
    </>
  );
}


ModalButton.propTypes = {
  children: PropTypes.node,
  buttonText: PropTypes.string,
};

export default ModalButton;
