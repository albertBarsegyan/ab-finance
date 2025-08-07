'use client';

import { useEffect, useState } from 'react';

export function useTimer(initialTime: number, cb?: VoidFunction) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return cb?.();

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cb, timeLeft]);

  return timeLeft;
}
