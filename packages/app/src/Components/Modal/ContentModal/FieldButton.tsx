import React from 'react';

type FieldButtonProps = {
  onClick?: (e: any) => void;
  label: string;
  svg?: React.ReactNode;
};

export const FieldButton = React.forwardRef<
  HTMLButtonElement,
  FieldButtonProps
>(({ onClick, label, svg }: FieldButtonProps, ref) => {
  return (
    <button
      ref={ref}
      className={`flex align-middle px-2 py-1 w-full hover:bg-gray-200 rounded-md`}
      onClick={onClick}
    >
      {svg && <span className="mr-2 my-auto">{svg}</span>}
      <div>{label}</div>
    </button>
  );
});
