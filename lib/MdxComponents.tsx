import { ComponentProps } from 'react';
import clsxm from './clsxm';

export const getMdxComponents = ({
  components,
}: {
  components?: { [key: string]: any };
}) => {
  return {
    blockquote: (props: ComponentProps<'blockquote'>) => (
      <blockquote
        className='mt-6 border-l-2 border-gray-300 pl-6 italic text-gray-700 first:mt-0 dark:border-gray-700 dark:text-gray-400'
        {...props}
      />
    ),

    table: (props: ComponentProps<'table'>) => (
      <div className='-mx-4 sm:mx-0'>
        <div className='inline-block w-full max-w-[100vw] overflow-x-auto sm:mx-0 sm:max-w-[calc(100vw-14rem-4rem)]'>
          <table
            className='mt-6 w-full min-w-full divide-y p-0 px-4 first:mt-0'
            style={{ borderSpacing: 0 }}
            {...props}
          />
        </div>
      </div>
    ),
    tr: (props: ComponentProps<'tr'>) => <tr className={''} {...props} />,
    th: (props: ComponentProps<'th'>) => {
      const isDescription = props.children === 'Description';
      const isPropOrDefault =
        props.children === 'Prop' || props.children === 'Default';
      return (
        <th
          scope='col'
          className={clsxm(
            isDescription && 'w-2/3',
            isPropOrDefault && 'w-1/6',
            'border-primar-400 sticky top-0 z-10 border-b bg-gray-100 bg-opacity-75 backdrop-blur dark:border-gray-500 dark:bg-gray-800',
            'py-3.5 px-3 text-left text-sm font-semibold text-gray-900 first:pl-4 first:pr-3 dark:text-gray-50 sm:first:pl-6 md:first:pl-0'
          )}
          {...props}
        />
      );
    },
    td: (props: ComponentProps<'td'>) => (
      <td
        className='prose prose-sm py-4 px-3 pl-4 align-baseline text-sm text-gray-500 first:pr-3 last:pl-3 last:pr-4 dark:text-gray-300 sm:first:pl-6 sm:last:pr-6 md:first:pl-0 md:last:pr-0'
        {...props}
      />
    ),
    code: (props: ComponentProps<'code'>) => (
      <code className='whitespace-nowrap dark:text-gray-50' {...props} />
    ),
    ...components,
  };
};
