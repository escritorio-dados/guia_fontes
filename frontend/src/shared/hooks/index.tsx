import { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}
