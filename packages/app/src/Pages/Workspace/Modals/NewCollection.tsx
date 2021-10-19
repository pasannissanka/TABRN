import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useContext, useState } from 'react';
import Button from '../../../Components/Button/Button';
import { AppContext } from '../../../Context/AppContextProvider';
import {
  EnumDKeyViewKind,
  useGetViewsCountQuery,
} from '../../../Types/generated-graphql-types';
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
  const [viewKind, setViewKind] = useState<EnumDKeyViewKind>();
  const [result] = useGetViewsCountQuery({
    variables: {
      titleRegex: 'untitled',
      workspaceId: workspaceData?.workspaceData?._id,
    },
    requestPolicy: 'network-only',
    pause: mode === 'edit' || !workspaceData?.workspaceData,
  });

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={
            mode === 'edit'
              ? data
              : {
                  title: `Untitled (${result.data?.viewsCount! + 1})`,
                  description: '',
                  kind: '',
                }
          }
          onSubmit={({ title, description }) => {
            onSubmit(
              {
                title,
                description,
                kind: viewKind!,
              },
              mode
            );
            onClose();
          }}
        >
          {(props: FormikProps<CollectionBase>) => (
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
                placeholder="Describe Workspace View..."
              />
              <h3 className="flex my-2 text-base">Select type</h3>
              <div className="flex flex-col w-full">
                <Button
                  type="submit"
                  varient="outline"
                  className="mx-auto my-1"
                  onClick={() => {
                    setViewKind(EnumDKeyViewKind.ListView);
                    // props.submitForm();
                  }}
                >
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
                  List
                </Button>
                <Button
                  type="submit"
                  varient="outline"
                  className="mx-auto my-1"
                  onClick={() => {
                    setViewKind(EnumDKeyViewKind.Calender);
                    // props.submitForm();
                  }}
                >
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
                  Calender
                </Button>
                <Button
                  type="submit"
                  varient="outline"
                  className="mx-auto my-1"
                  onClick={() => {
                    setViewKind(EnumDKeyViewKind.ListView);
                    // props.submitForm();
                  }}
                >
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
                  Board
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
