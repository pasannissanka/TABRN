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
      className={`flex align-middle px-2 py-2 w-full h-full hover:bg-gray-200 rounded-md truncate`}
      onClick={onClick}
    >
      {svg && <span className="mr-2 my-auto">{svg}</span>}
      {label !== '' ? (
        <div className="my-auto">{label}</div>
      ) : (
        <div className="my-auto text-gray-500">Empty</div>
      )}
    </button>
  );
});
