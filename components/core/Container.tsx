import clsxm from 'lib/clsxm';

export function Container({
  className = '',
  as = 'section',
  ...props
}: {
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) {
  const Component = as;
  return (
    <Component
      className={clsxm('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
