import clsxm from 'lib/clsxm';
import Link from 'next/link';

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className={clsxm(
        'inline-block rounded-lg py-1 px-2 text-sm',
        'text-slate-700 hover:bg-slate-200/50 hover:text-slate-900',
        'dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-slate-100'
      )}
    >
      {children}
    </Link>
  );
}
