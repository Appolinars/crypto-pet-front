import { RefObject, useEffect, useRef, useState } from 'react';

type TypeUseOnScreen = (ref: RefObject<HTMLElement>, playOnce?: boolean) => boolean;

export const useOnScreen: TypeUseOnScreen = (ref, playOnce = true) => {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  if (isOnScreen && playOnce && observerRef.current) {
    observerRef.current.disconnect();
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
  }, []);

  useEffect(() => {
    if (observerRef.current && ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
};
