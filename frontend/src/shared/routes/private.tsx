import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '#shared/hooks/auth';
import { useToast } from '#shared/hooks/toast';

interface IPrivateRoute {
  children: JSX.Element;
}

export function PrivateRoute({ children }: IPrivateRoute) {
  const { logged } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!logged) {
      toast({
        message: 'Somente usuarios autenticados podem acessar essa página',
        severity: 'error',
      });
    }
  }, [logged, toast]);

  if (!logged) return <Navigate to="/auth" state={{ returnThisPage: true }} />;

  return children;
}
