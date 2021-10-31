import React from 'react';
import Button from '../../../Components/Button/Button';

type NewWorkspaceProps = {
  onSubmit: (mode: 'edit' | 'new') => void;
  onClose: () => void;
  mode: 'edit' | 'new';
};

export const NewWorkspace = ({
  onSubmit,
  onClose,
  mode,
}: NewWorkspaceProps) => {
  return (
    <>
      <div>
        <div className="mt-4 space-x-2">
          <Button onClick={onClose} varient="outline">
            Close
          </Button>
          <Button onClick={() => onSubmit(mode)} varient="primary">
            {mode === 'new' ? <p>Create</p> : <p>Save</p>}
          </Button>
        </div>
      </div>
    </>
  );
};
