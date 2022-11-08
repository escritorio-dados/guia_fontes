import { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { KeepStatesProvider } from './keepStates';
import { LoadingProvider } from './loading';
import { NavBarProvider } from './navBar';
import { TitleProvider } from './title';
import { ToastProvider } from './toast';

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <LoadingProvider>
      <KeepStatesProvider>
        <ToastProvider>
          <NavBarProvider>
            <TitleProvider>
              <AuthProvider>{children}</AuthProvider>
            </TitleProvider>
          </NavBarProvider>
        </ToastProvider>
      </KeepStatesProvider>
    </LoadingProvider>
  );
}
