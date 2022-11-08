import { createContext, useCallback, useState, useContext, ReactNode, useMemo } from 'react';

interface ITitleProviderProps {
  children: ReactNode;
}

interface ITitleContextData {
  title: string;
  updateTitle: (title: string, documentTitle?: string) => void;
}

const TitleContext = createContext<ITitleContextData>({} as ITitleContextData);

export function TitleProvider({ children }: ITitleProviderProps) {
  const [title, setTitle] = useState('Guia de Fontes');

  const updateTitle = useCallback((newTitle: string, documentTitle?: string) => {
    setTitle(newTitle);

    document.title = `Guia de Fontes - ${documentTitle ?? newTitle}`;
  }, []);

  const titleValue = useMemo(() => {
    return { title, updateTitle };
  }, [title, updateTitle]);

  return <TitleContext.Provider value={titleValue}>{children}</TitleContext.Provider>;
}

export function useTitle(): ITitleContextData {
  const context = useContext(TitleContext);

  if (Object.keys(context).length === 0) {
    throw new Error('useTitle must be used within an TitleProvider');
  }

  return context;
}
