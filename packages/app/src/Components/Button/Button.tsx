import React from 'react';

export type ButtonProps = {
  varient?:
    | ''
    | 'primary'
    | 'secondary'
    | 'warn'
    | 'outline'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-warn'
    | 'flat'
    | 'flat-white';
  size?: 'sm' | 'md' | 'xs';
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ varient = '', size = 'md', children, ...props }: ButtonProps, ref) => {
    const sizeStyle =
      size === 'sm' ? 'py-1 px-2 ' : size === 'xs' ? 'py-2 px-0' : 'py-2 px-4';
    return (
      <button
        ref={ref}
        {...props}
        className={`${sizeStyle} inline-flex h-full justify-center text-sm font-medium rounded-md focus:ring-0 focus:ring-primary-200 transition-colors duration-300
          btn-${varient} ${props.className}
        `}
      >
        {children}
      </button>
    );
  }
);

export default Button;
