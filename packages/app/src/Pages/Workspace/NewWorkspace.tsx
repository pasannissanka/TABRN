import React from 'react';
import { WorkspaceBase } from '../../Types/types';
import { Formik, FormikProps, Field, Form } from 'formik';
import { InputField } from '../../Components/FormField/Input';
import Button from '../../Components/Button/Button';

type NewWorkspaceProps = {
  newWorkspaceValue: WorkspaceBase;
  onSubmit: (value: WorkspaceBase, mode: 'edit' | 'new') => void;
  onClose: () => void;
  mode: 'edit' | 'new';
};

export const NewWorkspace = ({
  onSubmit,
  onClose,
  newWorkspaceValue,
  mode,
}: NewWorkspaceProps) => {
  return (
    <>
      <div>
        <Formik
          initialValues={newWorkspaceValue}
          onSubmit={({ title, description, colorCode }) => {
            onSubmit(
              {
                title,
                description,
                colorCode,
              },
              mode
            );
          }}
        >
          {(props: FormikProps<WorkspaceBase>) => (
            <Form className="my-3">
              <Field
                className="my-1 w-full"
                type="text"
                name="title"
                placeholder="Title"
              />
              <Field
                className="my-1 w-full max-h-28"
                as="textarea"
                name="description"
                placeholder="Describe Workspace..."
              />
              <div className="mt-4 space-x-2">
                <Button onClick={onClose} varient="outline">
                  Close
                </Button>
                <Button type="submit" varient="primary">
                  {mode === 'new' ? <p>Create</p> : <p>Save</p>}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
