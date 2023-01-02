import clsxm from 'lib/clsxm';
import Link from 'next/link';

export function NavLink({ href, theme = 'auto', className = '', children }) {
  return (
    <Link
      href={href}
      className={clsxm(
        theme === 'light' ? 'nav-button-light' : 'nav-button',
        className
      )}
    >
      {children}
    </Link>
  );
}
