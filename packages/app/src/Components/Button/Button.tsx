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
    | 'flat';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ varient = '', size = 'md', children, ...props }: ButtonProps, ref) => {
    const sizeStyle = size === 'sm' ? 'py-1 px-2 ' : 'py-2 px-4';
    return (
      <button
        ref={ref}
        {...props}
        className={`${sizeStyle} inline-flex h-full justify-center text-sm font-medium rounded-md focus:ring-1 focus:ring-primary-200 transition-colors duration-300
          btn-${varient} ${props.className}
        `}
      >
        {children}
      </button>
    );
  }
);

export default Button;
