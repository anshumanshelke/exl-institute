export default function Toast({ message, type, onClose }) {
  const isError = type === 'error';

  return (
    <div className={`toast toast--${isError ? 'error' : 'success'}`} role={isError ? 'alert' : 'status'} aria-live={isError ? 'assertive' : 'polite'}>
      <span>{message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}
