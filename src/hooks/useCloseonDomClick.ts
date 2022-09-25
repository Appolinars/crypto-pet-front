import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

type TypeUseCloseOnDomClick = (
  targetRef: RefObject<HTMLElement>,
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>
) => void;

export const useCloseOnDomClick: TypeUseCloseOnDomClick = (targetRef, isActive, setIsActive) => {
  useEffect(() => {
    const onDomClick = (e: Event) => {
      if (targetRef.current && isActive && !targetRef.current.contains(e.target as HTMLElement)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', onDomClick);
    return () => {
      document.removeEventListener('click', onDomClick);
    };
  }, [isActive, targetRef, setIsActive]);
};
