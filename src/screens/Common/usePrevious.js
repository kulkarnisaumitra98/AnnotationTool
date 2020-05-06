import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    ref.current = value;
  });

  if (value === ref.current) {
    return ref2.current;
  }

  ref2.current = ref.current;
  return ref.current;
};

export default usePrevious;
