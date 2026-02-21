import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useAsync(fn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback((...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result
          .then(r => { setData(r); return r; })
          .catch(err => { setError(err.message); toast.error(err.message); throw err; })
          .finally(() => setLoading(false));
      }
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
      throw err;
    }
  }, [fn]);

  return { data, loading, error, execute, setData };
}
