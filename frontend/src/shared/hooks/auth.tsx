import { isBefore, fromUnixTime } from 'date-fns';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { createContext, useCallback, useState, useContext, ReactNode, useMemo } from 'react';

import { Loading } from '#shared/components/Loading';
import { usePost } from '#shared/services/useAxios';

import { IUser } from '#modules/admin/users/types/IUser';

import { useToast } from './toast';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthInput {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  logged: boolean;
  signIn: (authInput: IAuthInput) => Promise<void>;
  signOut: () => Promise<void>;
}

interface IAuthState {
  token: string;
  user: IUser;
}

type IGuiaFontesToken = JwtPayload & { email: string };

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GuiaFontes:token');
    const user = localStorage.getItem('@GuiaFontes:user');

    if (token != null) {
      const decodedToken = jwt_decode<IGuiaFontesToken>(token);

      if (
        decodedToken.exp != null &&
        Boolean(isBefore(fromUnixTime(Number(decodedToken.exp)), new Date()))
      ) {
        localStorage.removeItem('@GuiaFontes:token');
        localStorage.removeItem('@GuiaFontes:user');

        return {} as IAuthState;
      }
    }

    if (token != null && user != null) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const { toast } = useToast();

  const { loading, send: auth } = usePost<IAuthResponse, IAuthInput>('/auth');

  const signIn = useCallback(
    async (authInput: IAuthInput) => {
      const { data: authData, error } = await auth(authInput);

      if (error != null) {
        toast({ message: error, severity: 'error' });

        return;
      }

      const { token, user } = authData as IAuthResponse;

      localStorage.setItem('@GuiaFontes:token', token);
      localStorage.setItem('@GuiaFontes:user', JSON.stringify(user));

      setData({ token, user });
    },
    [auth, toast],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GuiaFontes:token');
    localStorage.removeItem('@GuiaFontes:user');

    setData({} as IAuthState);
  }, []);

  const authValue = useMemo<IAuthContextData>(() => {
    return {
      user: data.user,
      logged: data.user != null,
      signIn,
      signOut,
    };
  }, [data.user, signIn, signOut]);

  return (
    <AuthContext.Provider value={authValue}>
      <Loading loading={loading} />

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
