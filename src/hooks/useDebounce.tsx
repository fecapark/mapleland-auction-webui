import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (value !== "") {
      setIsDebouncing(true);
      timer = setTimeout(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
      }, delay);
    } else {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { value: debouncedValue, isDebouncing };
}
