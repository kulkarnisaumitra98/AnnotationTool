/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url, params) => {
  const [state, setstate] = useState({ data: null, loading: true });

  useEffect(() => {
    setstate({ data: null, loading: true });

    const fetch = async () => {
      try {
        const response = await axios.get(
          url,
          params,
        );
        setstate({ data: response.data, loading: false });
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [url]);

  return state;
};
