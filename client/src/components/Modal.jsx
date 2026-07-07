const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: 20, borderRadius: 8, width: 400, maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ float: 'right', border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }}>X</button>
        {children}
      </div>
    </div>
  );
};
export default Modal;