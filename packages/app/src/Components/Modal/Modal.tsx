import React from 'react';
import Button from '../Button/Button';
import { BaseModal, BaseModalProps } from './BaseModal';

const DefaultCloseButton = (props: { onClose: () => void }) => {
  return (
    <Button onClick={props.onClose} varient="outline">
      Close
    </Button>
  );
};

export const Modal = ({ children, ...props }: BaseModalProps) => {
  return (
    <>
      <BaseModal {...props}>{children}</BaseModal>
    </>
  );
};

export const DialogModal = ({
  children,
  onClose,
  ...props
}: BaseModalProps) => {
  return (
    <>
      <BaseModal onClose={onClose} {...props}>
        {children}
        <DefaultCloseButton onClose={onClose} />
      </BaseModal>
    </>
  );
};

const DefaultConfirmationButtons = (props: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="mt-4 space-x-2">
      <Button onClick={props.onClose} varient="outline">
        No
      </Button>
      <Button onClick={props.onSubmit} varient="warn">
        Yes
      </Button>
    </div>
  );
};

export interface ConfirmationDialogModal extends BaseModalProps {
  onSubmit(): void;
}

export const ConfirmationDialog = ({
  onClose,
  children,
  onSubmit,
  ...props
}: ConfirmationDialogModal) => {
  return (
    <>
      <BaseModal onClose={onClose} {...props}>
        {children}
        <DefaultConfirmationButtons onClose={onClose} onSubmit={onSubmit!} />
      </BaseModal>
    </>
  );
};
