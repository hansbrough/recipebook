// save reference to a 'previous' value
// 'hook' version of 'prevProp' behavior in 'componentDidUpdate'
import { useRef, useEffect } from 'react';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
