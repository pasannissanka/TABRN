import { Menu } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useContext, useState } from 'react';
import Button from '../../../Components/Button/Button';
import { AppContext } from '../../../Context/AppContextProvider';
import { EnumCollectionType } from '../../../Types/generated-graphql-types';
import { CollectionBase } from '../../../Types/types';

type NewCollectionProps = {
  data: CollectionBase;
  onSubmit(data: CollectionBase, mode: 'edit' | 'new'): void;
  onClose(): void;
  mode: 'edit' | 'new';
};

export const NewCollection = ({
  data,
  mode,
  onClose,
  onSubmit,
}: NewCollectionProps) => {
  const { workspaceData } = useContext(AppContext);

  const [choosenEmoji, setChoosenEmoji] = useState<any>({
    emoji: '💼',
  });

  const [viewKind, setViewKind] = useState<EnumCollectionType>();
  // const [result] = useGetViewsCountQuery({
  //   variables: {
  //     titleRegex: 'untitled',
  //     workspaceId: workspaceData?.workspaceData?._id,
  //   },
  //   requestPolicy: 'network-only',
  //   pause: mode === 'edit' || !workspaceData?.workspaceData,
  // });

  const onEmojiClick = (_: any, emojiObject: any) => {
    setChoosenEmoji(emojiObject);
  };

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={
            mode === 'edit'
              ? data
              : {
                  title: `Untitled`,
                  description: '',
                  type: null,
                }
          }
          onSubmit={({ title, description }) => {
            if (viewKind) {
              onSubmit(
                {
                  title,
                  description,
                  type: viewKind,
                  icon: choosenEmoji.emoji,
                },
                mode
              );
              onClose();
            }
          }}
        >
          {(props: FormikProps<CollectionBase>) => (
            <Form className="my-3">
              <div className="flex">
                <Menu as="div" className="relative inline-block mr-2 my-1">
                  <Menu.Button
                    as={Button}
                    varient="outline"
                    type="button"
                    className="h-full"
                  >
                    {choosenEmoji?.emoji}
                  </Menu.Button>
                  <Menu.Items className="ring-primary-700 absolute z-50 mt-2 bg-white rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
                    <EmojiPicker
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
              <Field
                className="my-1 w-full"
                as="textarea"
                name="description"
                placeholder="Describe Collection..."
              />
              <div className="grid gap-2 grid-cols-2 m-auto my-4 w-1/2">
                <Button
                  type="submit"
                  varient="outline"
                  className="col-span-2 mx-auto my-1 w-full"
                  onClick={() => {
                    setViewKind(EnumCollectionType.List);
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-center my-1 text-lg">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </span>
                      <span>List</span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Use list to organize entries
                    </div>
                  </div>
                </Button>
                <Button
                  type="submit"
                  varient="outline"
                  className="col-span-1 mx-auto my-1 w-full"
                  onClick={() => {
                    setViewKind(EnumCollectionType.Calender);
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-center my-1 text-lg">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <span>Calender</span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Use list to organize entries
                    </div>
                  </div>
                </Button>
                <Button
                  type="submit"
                  varient="outline"
                  className="col-span-1 mx-auto my-1 w-full"
                  onClick={() => {
                    setViewKind(EnumCollectionType.Kanban);
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-center my-1 text-lg">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                          />
                        </svg>
                      </span>
                      <span>Board</span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Use list to organize entries
                    </div>
                  </div>
                </Button>
              </div>
              <div className="mt-4 space-x-2">
                <Button onClick={onClose} varient="outline">
                  Close
                </Button>
                {mode === 'edit' && (
                  <Button type="submit" varient="primary">
                    Save
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
