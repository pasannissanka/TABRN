import React from 'react';

type ButtonProps = {
  varient: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  varient = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`py-2 inline-flex h-full justify-center px-4 text-sm font-medium border border-transparent rounded-md focus:ring-1 focus:ring-primary-200 transition-colors duration-300
          btn-${varient}
        `}
    >
      {children}
    </button>
  );
}
