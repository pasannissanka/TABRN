import * as React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button icons
   */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  label,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`border
      border-transparent
      rounded-md
      inline-flex
      items-center
      focus:outline-none
      focus:shadow-outline 
      font-semibold 
      py-2
      px-2
      md:px-5
      text-sm
      transition-colors
      duration-300
      ${
        primary
          ? 'bg-indigo-500 hover:bg-indigo-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          : 'bg-white text-black hover:text-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      }
      `}
      {...props}
    >
      <span
        className={`${children !== undefined ? 'hidden md:block mr-2' : ''}`}
      >
        {label}
      </span>
      {children ? <span className="w-5 h-5">{children}</span> : <></>}
    </button>
  );
};
