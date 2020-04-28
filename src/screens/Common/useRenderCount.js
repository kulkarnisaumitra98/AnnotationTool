import { useRef } from 'react';

const useRenderCount = () => {
  const ref = useRef(0);

  console.log(ref.current++, 'rendered');
};

export default useRenderCount;
