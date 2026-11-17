import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts(current => current.filter(toast => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(current => [...current, { id, message, type }]);
    timers.current.set(id, setTimeout(() => dismissToast(id), 4000));
    return id;
  }, [dismissToast]);

  useEffect(() => () => {
    timers.current.forEach(timer => clearTimeout(timer));
  }, []);

  return { toasts, showToast, dismissToast };
}
