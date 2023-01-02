import clsxm from 'lib/clsxm';

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-primary-500 sm:text-sm';
const formClassesDark =
  'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:bg-gray-900 dark:focus:ring-primary-500';

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300'
    >
      {children}
    </label>
  );
}

export function TextField({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        {...props}
        className={clsxm(formClasses, formClassesDark)}
      />
    </div>
  );
}

export function SelectField({ id, label, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        id={id}
        {...props}
        className={clsxm(formClasses, formClassesDark, 'pr-8')}
      />
    </div>
  );
}
