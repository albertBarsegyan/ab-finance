import { useEffect, useRef, useState } from 'react';

type IntersectionHookInit = IntersectionObserverInit;

type OnIntersection = (
  isIntersecting: boolean,
  ob: IntersectionObserver
) => boolean | void;

const DefaultOptions: IntersectionHookInit = {
  root: null,
  threshold: 0,
};

const DefaultOnIntersection: OnIntersection = isIntersecting => {
  if (isIntersecting) return false;
};

export function useIntersection({
  onIntersection = DefaultOnIntersection,
  options = DefaultOptions,
  delay,
}: {
  onIntersection?: OnIntersection;
  options?: IntersectionHookInit;
  delay?: number;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elemRef = useRef<null | HTMLElement | undefined>(null);

  const setElem = (elem: HTMLElement | null) => {
    elemRef.current = elem;
  };

  useEffect(() => {
    if (!elemRef.current) return;
    let isUnmounted = false;

    let timeout: null | ReturnType<typeof setTimeout>;

    const ob = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (isUnmounted) return;

        const isElementIntersecting = entry.isIntersecting;

        const action = () => {
          setIsIntersecting(isElementIntersecting);
        };

        if (onIntersection(isElementIntersecting, ob) === false) {
          ob.disconnect();
        }

        if (delay) {
          timeout = setTimeout(action, 1000 * delay);
          return;
        }

        action();
      }
    }, options);

    ob.observe(elemRef.current);

    return () => {
      ob.disconnect();
      isUnmounted = true;

      if (timeout) clearTimeout(timeout);
    };
  }, [onIntersection, delay, options]);

  return [isIntersecting, setElem] as const;
}
