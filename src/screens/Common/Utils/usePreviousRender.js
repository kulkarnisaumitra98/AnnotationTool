import { useEffect, useRef } from 'react';

const usePreviousRender = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePreviousRender;
