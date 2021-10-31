import { Menu, Popover } from '@headlessui/react';
import React from 'react';
import { ReactComponent as DateSVG } from '../../../svg/heroicons/clock.svg';
import { ReactComponent as TextSVG } from '../../../svg/heroicons/document_text.svg';
import { ReactComponent as NumberSVG } from '../../../svg/heroicons/hashtag.svg';
import { ReactComponent as LinkSVG } from '../../../svg/heroicons/link.svg';
import { FIELD_TYPE } from '../../../Types/types';
import { InputField } from '../../FormField/Input';
import { ContentModalFormikType } from './ContentModal';
import { FieldButton } from './FieldButton';

type ContentFieldProps<T> = {
  values: T;
  index: number;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const fieldsKind = [
  {
    label: 'Text',
    svg: <TextSVG className="w-5 h-5 text-gray-500" />,
    kind: FIELD_TYPE.STRING,
  },
  {
    label: 'Number',
    svg: <NumberSVG className="w-5 h-5 text-gray-500" />,
    kind: FIELD_TYPE.NUMBER,
  },
  {
    label: 'Date',
    svg: <DateSVG className="w-5 h-5 text-gray-500" />,
    kind: FIELD_TYPE.DATE,
  },
  {
    label: 'Link',
    svg: <LinkSVG className="w-5 h-5 text-gray-500" />,
    kind: FIELD_TYPE.LINK,
  },
];

export const ContentField = <T extends ContentModalFormikType>({
  values,
  index,
  setFieldValue,
}: ContentFieldProps<T>) => {
  const field = values.fields[index];

  const svg =
    field.kind === FIELD_TYPE.DATE ? (
      <DateSVG className="w-5 h-5 text-gray-500" />
    ) : field.kind === FIELD_TYPE.LINK ? (
      <LinkSVG className="w-5 h-5 text-gray-500" />
    ) : field.kind === FIELD_TYPE.NUMBER ? (
      <NumberSVG className="w-5 h-5 text-gray-500" />
    ) : (
      <TextSVG className="w-5 h-5 text-gray-500" />
    );

  const fieldKind =
    field.kind === FIELD_TYPE.DATE
      ? 'Date'
      : field.kind === FIELD_TYPE.LINK
      ? 'Link'
      : field.kind === FIELD_TYPE.NUMBER
      ? 'Number'
      : 'Text';

  return (
    <div className="flex w-full text-black">
      <Popover as="div" className="relative my-1 w-3/12">
        <Popover.Button as={FieldButton} label={field.key} svg={svg} />
        <Popover.Panel className="ring-primary-700 absolute z-50 mt-1 p-3 w-full bg-white border rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
          {({ close }) => (
            <div>
              <div className="flex flex-col mb-2">
                <InputField
                  id="key-field"
                  title="Field name"
                  type="text"
                  name={`fields.${index}.key`}
                  placeholder="Field name"
                />
              </div>
              <Menu as="div" className="relative my-1 w-full">
                <Menu.Button as={FieldButton} label={fieldKind} svg={svg} />
                <Menu.Items className="ring-primary-700 absolute z-50 left-full top-0 p-1 w-full bg-white border rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
                  {fieldsKind.map((kind, idx) => (
                    <Menu.Item key={idx}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-200' : ''
                          } group flex rounded-md items-center w-full px-2 text-black py-2 text-sm`}
                          onClick={() => {
                            setFieldValue(`fields.${index}.kind`, kind.kind);
                            close();
                          }}
                        >
                          {kind.svg}
                          <span className="mx-2 text-base">{kind.label}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          )}
        </Popover.Panel>
      </Popover>
      <div className="flex-1 mx-2 my-1 px-2">
        <FieldButton label={field.value} />
      </div>
    </div>
  );
};
