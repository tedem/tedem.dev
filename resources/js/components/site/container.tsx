import type { HTMLAttributes } from 'react';

import { cn } from 'cn';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  border?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

export default function Container({ size = 'xl', className = '', border = false, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 md:px-8 lg:px-16 2xl:border-x 2xl:border-transparent',
        sizeClasses[size],
        className,
        border && '2xl:border-border',
      )}
      {...props}
    >
      {children}
    </div>
  );
}
