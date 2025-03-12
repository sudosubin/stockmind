import { useEffect, useState } from "preact/hooks";

export const useFakeLoading = ({ duration }: { duration: number }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  return { isLoading };
};
