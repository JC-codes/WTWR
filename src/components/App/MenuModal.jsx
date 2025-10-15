import React, { useEffect } from "react";
import "../../blocks/MenuModal.css";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";
import CloseIcon from "../../images/close-black.svg";

export default function MenuModal({
  isOpen,
  onClose,
  modalRef,
  username,
  avatar,
  handleAddClick,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onAdd = () => {
    if (handleAddClick) handleAddClick();
    onClose();
  };

  return (
    <div className="menu-modal__overlay" role="dialog" onClick={onClose}>
      <div
        className="menu-modal__content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="menu-modal__close" onClick={onClose} type="button">
          <img src={CloseIcon} alt="Close menu"></img>
        </button>

        <nav className="menu-modal__nav">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="menu-modal__profile-link"
          >
            <span className="menu-modal__username">{username}</span>
            {avatar && (
              <img src={avatar} alt={username} className="menu-modal__avatar" />
            )}
          </NavLink>

          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={onAdd}
          >
            + Add clothes
          </button>

          <div className="menu-modal__toggle">
            <ToggleSwitch />
          </div>
        </nav>
      </div>
    </div>
  );
}
