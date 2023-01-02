import Link from 'next/link';
import clsxm from 'lib/clsxm';

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-md py-2 px-4 text-sm focus:outline-none',
};

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    gradient:
      'transition hover:animate-flicker text-white from-rose-800 bg-gradient-to-r to-primary-700 hover:text-slate-100 hover:to-primary-500 hover:from-rose-600 active:bg-primary-800 active:text-primary-50 focus-visible:outline-primary-600',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
    red: 'bg-red-500 text-white hover:text-slate-100 hover:bg-red-600 active:bg-red-700 active:text-red-100 focus-visible:outline-red-500',
    primary:
      'bg-primary-600 text-white hover:text-slate-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600',
    secondary:
      'bg-gray-100 text-gray-900 hover:text-slate-100 hover:bg-gray-200 active:bg-gray-300 active:text-gray-900 focus-visible:outline-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:active:bg-gray-500 dark:active:text-gray-100 dark:focus-visible:outline-gray-700',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    red: 'ring-red-500 text-red-500 hover:ring-red-600 active:ring-red-700 active:text-red-600 focus-visible:outline-red-500',
  },
};

export function Button({
  variant = 'solid',
  color = 'slate',
  className = '',
  href = undefined,
  isLoading = false,
  children,
  ...props
}: {
  variant?: keyof typeof baseStyles;
  color?: keyof typeof variantStyles['solid'];
  className?: string;
  href?: string;
  isLoading?: boolean;
  [key: string]: any;
}) {
  className = clsxm(
    baseStyles[variant],
    variantStyles[variant][color],
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  return href ? (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={clsxm('relative', className)} {...props}>
      {isLoading && (
        <div
          className={clsxm(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            {
              'text-black dark:text-white': [
                'primary',
                'secondary',
                'dark',
              ].includes(variant),
              'text-black': ['light'].includes(variant),
              'text-primary-500': ['outline'].includes(variant),
            }
          )}
        >
          <svg
            className='h-5 w-5 animate-spin text-current'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v8z'
            />
          </svg>
        </div>
      )}
      <div className={clsxm(isLoading && 'opacity-0', 'inline-flex')}>
        {children}
      </div>
    </button>
  );
}
