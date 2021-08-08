import React from 'react';
import { WorkspaceBase } from '../../Types/types';
import { Formik, FormikProps, Field, Form } from 'formik';
import { InputField } from '../../Components/FormField/Input';
import Button from '../../Components/Button/Button';

type NewWorkspaceProps = {
  newWorkspaceValue: WorkspaceBase;
  onSubmit: (value: WorkspaceBase) => void;
};

export const NewWorkspace = ({ onSubmit }: NewWorkspaceProps) => {
  const initialValue: WorkspaceBase = {
    title: '',
    description: '',
    colorCode: '',
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValue}
          onSubmit={({ title, description, colorCode }) => {
            onSubmit({
              title,
              description,
              colorCode,
            });
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
              <div className="mt-4">
                <Button type="submit" varient="primary">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
