import React from 'react';

function Alert({ type = 'info', message, onClose }) {
  if (!message) return null;

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          marginLeft: 'auto',
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default Alert;

