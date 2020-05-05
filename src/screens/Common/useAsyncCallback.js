import { useState } from 'react';

const useAsyncCallback = (initialState) => {
  const [state, setstate] = useState({ ...initialState, change: true });

  return [
    state,
    (data) => setstate((prevState) => ({
      ...prevState,
      change: !prevState.change,
      ...data,
    })),
  ];
};

export default useAsyncCallback;
