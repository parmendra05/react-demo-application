// ModalOverlay — dark background wrapper for all modals
// Props:
//   onClose (function) — called when user clicks the dark background
//   children          — the white modal box rendered inside

export default function ModalOverlay({ onClose, children, className = "" }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents clicks inside from closing the modal */}
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
