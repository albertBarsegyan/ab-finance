import { useIntersection } from '@/shared/hooks/intersection-observer';
import { cn } from '@/shared/lib/utils';
import React, { type CSSProperties, forwardRef } from 'react';

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 200;

export interface LazyImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  src: string;
  alt?: string;
}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  function LazyImage(
    {
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
      style,
      src,
      className,
      alt,
      ...rest
    },
    ref
  ) {
    const [isIntersecting, intersectionRef] = useIntersection({ delay: 0.2 });

    const imageStyles = cn(
      'transition duration-300',
      {
        'blur-[10px] opacity-0 object-cover': !isIntersecting,
        'object-cover opacity-100': isIntersecting,
      },
      className
    );

    const refCb = (node: HTMLImageElement | null) => {
      intersectionRef(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <img
        ref={refCb}
        className={imageStyles}
        width={width}
        height={height}
        style={style}
        src={src}
        alt={alt}
        {...rest}
      />
    );
  }
);
