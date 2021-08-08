import React from 'react';
import Button from '../Button/Button';
import { BaseModal, BaseModalProps, ModalProps } from './BaseModal';

interface Modal {}

const DefaultCloseButton = (props: { onClose: () => void }) => {
  return (
    <Button onClick={props.onClose} varient="outline">
      Close
    </Button>
  );
};

export const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <>
      <BaseModal {...props}>{children}</BaseModal>
    </>
  );
};

export const DialogModal = ({
  children,
  onClose,
  action = <DefaultCloseButton onClose={onClose} />,
  ...props
}: BaseModalProps) => {
  return (
    <>
      <BaseModal size="md" onClose={onClose} {...props}>
        {children}
      </BaseModal>
    </>
  );
};
