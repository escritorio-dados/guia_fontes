import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useLoading } from '#shared/hooks/loading';
import { getError } from '#shared/utils/getError';

import { axiosClient } from './axiosClient';

interface ISendWithInput<T> {
  data?: T;
  error?: string;
}

interface IUseWithoutInput<T> {
  data?: T;
  error?: string;
  send: (conf?: AxiosRequestConfig) => Promise<void>;
}

type IUseGet<T> = IUseWithoutInput<T> & {
  updateData: React.Dispatch<React.SetStateAction<T | undefined>>;
  sendGet: (conf?: AxiosRequestConfig) => Promise<ISendWithInput<T>>;
};

interface IUseWithInput<T, D> {
  send: (input: D, conf?: AxiosRequestConfig) => Promise<ISendWithInput<T>>;
}

interface IUseDelete<T> {
  send: () => Promise<ISendWithInput<T>>;
}

interface IUseGetParams {
  url: string;
  config?: AxiosRequestConfig;
  lazy?: boolean;
}

export function useGet<T>({ url, lazy, config }: IUseGetParams): IUseGet<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  const { startLoading, stopLoading } = useLoading();

  const send = useCallback(
    async (conf?: AxiosRequestConfig) => {
      startLoading();

      try {
        const response = await axiosClient.get<T>(conf?.url ?? url, conf);

        setData(response);
      } catch (e) {
        setError((current) => {
          const newError = getError(e);

          if (current === newError) {
            if (current[current.length - 1] === ' ') {
              return newError;
            }

            return `${newError} `;
          }

          return newError;
        });
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, url],
  );

  const sendGet = async (conf?: AxiosRequestConfig) => {
    startLoading();

    let dataGet;
    let errorGet;

    try {
      const response = await axiosClient.get<T>(conf?.url ?? url, conf);

      dataGet = response;
    } catch (e) {
      errorGet = getError(e);
    }

    stopLoading();

    return { data: dataGet, error: errorGet };
  };

  useEffect(() => {
    if (lazy === true) {
      return;
    }

    void send(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, send, updateData: setData, sendGet };
}

export function usePost<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const { startLoading, stopLoading } = useLoading();

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    startLoading();

    let data;
    let error;

    try {
      const response = await axiosClient.post<T, D>(conf?.url ?? url, input, {
        ...config,
        ...conf,
      });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    stopLoading();

    return { data, error };
  };

  return { send };
}

export function usePut<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const { startLoading, stopLoading } = useLoading();

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    startLoading();

    let data;
    let error;

    try {
      const response = await axiosClient.put<T, D>(conf?.url ?? url, input, { ...config, ...conf });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    stopLoading();

    return { data, error };
  };

  return { send };
}

export function usePatch<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const { startLoading, stopLoading } = useLoading();

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    startLoading();

    let data;
    let error;

    try {
      const response = await axiosClient.patch<T, D>(conf?.url ?? url, input, {
        ...config,
        ...conf,
      });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    stopLoading();

    return { data, error };
  };

  return { send };
}

export function useDelete<T = void>(url: string, config?: AxiosRequestConfig): IUseDelete<T> {
  const { startLoading, stopLoading } = useLoading();

  const send = async (conf?: AxiosRequestConfig) => {
    startLoading();

    let error;

    try {
      await axiosClient.delete<T>(conf?.url ?? url, { ...config, ...conf });
    } catch (e) {
      error = getError(e);
    }

    stopLoading();

    return { error };
  };

  return { send };
}
