import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

type TagProps = {
  className?: string;
  color?: 'fuchsia' | 'orange' | 'sky' | 'green';
  size?: 'sm' | 'base';
  children: ReactNode;
};

export const Tag: FC<TagProps> = ({
  className,
  color = 'fuchsia',
  size = 'sm',
  children,
}) => {
  return (
    <span
      className={cn(
        className,
        'w-min transform items-center gap-2 whitespace-nowrap rounded-full font-medium transition',
        {
          'bg-primary-900/20 text-primary-400': color === 'fuchsia',
          'bg-orange-900/20 text-orange-400': color === 'orange',
          'bg-sky-900/20 text-sky-400': color === 'sky',
          'bg-green-900/20 text-green-400': color === 'green',
          'px-2 py-0.5 text-xs': size === 'sm',
        },
      )}
    >
      {children}
    </span>
  );
};
