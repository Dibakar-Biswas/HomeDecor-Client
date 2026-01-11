import { useMemo } from 'react';

const useDemoAccount = () => {
  const isDemoAccount = useMemo(() => {
    return localStorage.getItem('isDemoAccount') === 'true';
  }, []);

  return { isDemoAccount };
};

export default useDemoAccount;
