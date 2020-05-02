/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { axiosGet } from './axiosConfig';

export const useFetch = (
  url,
  params,
  processData = (data) => data,
  corporaToggle,
) => {
  const [state, setstate] = useState({ data: null, loading: true });

  useEffect(() => {
    setstate({ data: null, loading: true, err: null });

    const fetch = async () => {
      const { data, err } = await axiosGet(url, params);
      setstate({ data: processData(data), err, loading: false });
    };

    fetch();
  }, [url, params.page]);

  return state;
};
