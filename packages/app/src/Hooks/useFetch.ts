import { useState, useEffect } from 'react';
import { IResponse } from '../Types/types';

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [serverError, setServerError] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await fetch(url, options);
        const data: T = await resp.json();

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, serverError };
};
