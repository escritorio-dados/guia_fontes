import { createContext, useCallback, useState, useContext, ReactNode, useMemo } from 'react';

interface INavBarProviderProps {
  children: ReactNode;
}

interface INavBarContextData {
  openNavBar: boolean;
  togleNavBar: () => void;
  closeNavBar: () => void;
}

const NavBarContext = createContext<INavBarContextData>({} as INavBarContextData);

export function NavBarProvider({ children }: INavBarProviderProps) {
  const [openNavBar, setOpenNavBar] = useState(true);

  const togleNavBar = useCallback(() => {
    setOpenNavBar(!openNavBar);
  }, [openNavBar]);

  const closeNavBar = useCallback(() => {
    setOpenNavBar(false);
  }, []);

  const navBarValue = useMemo(() => {
    return {
      openNavBar,
      togleNavBar,
      closeNavBar,
    };
  }, [closeNavBar, openNavBar, togleNavBar]);

  return <NavBarContext.Provider value={navBarValue}>{children}</NavBarContext.Provider>;
}

export function useNavBar(): INavBarContextData {
  const context = useContext(NavBarContext);

  if (Object.keys(context).length === 0) {
    throw new Error('useNavBar must be used within an NavBarProvider');
  }

  return context;
}
