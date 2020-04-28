/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const useSendData = (url, data) => {
  const [state, setstate] = useState(null);
  const csrftoken = Cookies.get('csrftoken');

  console.log(csrftoken, 'token');

  useEffect(() => {
    setstate({ response: null });

    const send = async () => {
      try {
        const response = await axios.post(url, {
          ...data,
          csrftoken,
        });
        console.log(response.data, 'fdsg');
        // setstate({ data: JSON.parse(response.data.corpora) });
      } catch (err) {
        console.log(err);
      }
    };

    send();
  }, [url]);

  return state;
};

export default useSendData;
