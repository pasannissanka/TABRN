import { Menu } from '@headlessui/react';
import Picker from 'emoji-picker-react';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../../../Components/Button/Button';
import { WorkspaceBase } from '../../../Types/types';

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
  const [chosenEmoji, setChosenEmoji] = useState<any>({
    emoji: '💼',
  });

  useEffect(() => {
    if (newWorkspaceValue.icon) {
      setChosenEmoji({
        emoji: newWorkspaceValue.icon,
      });
    }
  }, [newWorkspaceValue]);

  const onEmojiClick = (_: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <>
      <div>
        <Formik
          initialValues={newWorkspaceValue}
          onSubmit={({ title, description }) => {
            onSubmit(
              {
                title,
                description,
                icon: chosenEmoji.emoji,
              },
              mode
            );
          }}
        >
          {(props: FormikProps<WorkspaceBase>) => (
            <Form className="my-3">
              <div className="flex">
                <Menu as="div" className="relative inline-block mr-2 my-1">
                  <Menu.Button
                    as={Button}
                    varient="outline"
                    type="button"
                    className="h-full"
                  >
                    {chosenEmoji?.emoji}
                  </Menu.Button>
                  <Menu.Items className="ring-primary-700 absolute z-50 mt-2 bg-white rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
                    <Picker
                      onEmojiClick={onEmojiClick}
                      native={true}
                      pickerStyle={{ boxShadow: 'none' }}
                    />
                  </Menu.Items>
                </Menu>
                <Field
                  className="my-1 w-full"
                  type="text"
                  name="title"
                  placeholder="Title"
                />
              </div>
              {/* <Picker onEmojiClick={onEmojiClick} /> */}
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
