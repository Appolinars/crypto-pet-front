import { useEffect, useState } from 'react';


type TypeUseScrollLock = (initialLocked: boolean) => void;

export const useBodyScrollLock: TypeUseScrollLock = (initialLocked = false) => {
  const [locked, setLocked] = useState<boolean>(initialLocked);

  // Do the side effect before render
  useEffect(() => {
    if (!locked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [locked, initialLocked]);

  return [locked, setLocked];
};