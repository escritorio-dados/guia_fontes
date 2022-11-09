import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, useCallback, useState, useContext, ReactNode, useMemo } from 'react';

interface ILoadingContextData {
  startLoading: () => void;
  stopLoading: () => void;
}

interface ILoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<ILoadingContextData>({} as ILoadingContextData);

export function LoadingProvider({ children }: ILoadingProviderProps) {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => setLoading(true), []);

  const stopLoading = useCallback(() => setLoading(false), []);

  const loadingValue = useMemo(() => {
    return { startLoading, stopLoading };
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}

      <Backdrop open={loading} sx={{ zIndex: 9999 }}>
        <CircularProgress color="primary" size={75} />
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export function useLoading(): ILoadingContextData {
  const context = useContext(LoadingContext);

  if (Object.keys(context).length === 0) {
    throw new Error('useLoading must be used within an LoadingProvider');
  }

  return context;
}
