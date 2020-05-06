/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import useDidUpdate from '../useDidUpdate';
import { axiosGet } from './axiosConfig';

export const useFetch = (
  url,
  params,
  processData = (data) => data,
  reload,
) => {
  const [state, setstate] = useState({ _data: null, loading: true, err: null });

  useDidUpdate(() => {
    setstate({ _data: null, loading: true, err: null });

    const fetch = async () => {
      // console.log(' i am', url);
      const { data, err } = await axiosGet(url, params);
      setstate({ _data: err ? null : processData(data), err, loading: false });
    };

    fetch();
  }, [url, params.page, reload]);

  return state;
};
