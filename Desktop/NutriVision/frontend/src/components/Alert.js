import React, { useEffect } from 'react';

function Alert({ type = 'info', message, onClose }) {
    useEffect(() => {
        if (!message || !onClose) return;

        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) {
        return null;
    }

    return (
        <div className={`alert alert-${type}`}>
      <span>
        {type === 'success' && '✅'}
          {type === 'error' && '⚠️'}
          {type === 'info' && 'ℹ️'}
      </span>

            <span>{message}</span>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        marginLeft: 'auto',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        color: 'inherit',
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default Alert;